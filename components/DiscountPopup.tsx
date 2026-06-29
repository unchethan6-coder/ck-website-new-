'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Open popup after 3 seconds on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate email submission (replace with actual API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted(true);
      setEmail('');
      
      // Close popup after 2 seconds
      setTimeout(() => {
        setOpen(false);
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-w-[90vw] w-full gap-0 p-0 border-0 rounded-2xl overflow-hidden">
        {/* Close Button */}
        <DialogClose asChild>
          <button className="absolute right-4 top-4 z-50 p-1 hover:bg-primary/10 rounded-lg transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>

        {/* Main Content */}
        <div className="bg-gradient-to-b from-[#F4D957] to-[#F0C738] p-6 sm:p-8">
          {!submitted ? (
            <div className="space-y-4 sm:space-y-6 text-center">
              {/* Discount Badge */}
              <div className="inline-block">
                <div className="bg-background/40 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-background border-opacity-50">
                  <p className="text-sm sm:text-base font-bold text-foreground">
                    EXCLUSIVE OFFER
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                  85% OFF
                </h2>
                <p className="text-base sm:text-lg text-foreground font-semibold mt-2">
                  Your First Evaluation
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-xs mx-auto">
                Join thousands of traders evaluating their skills on our platform. Limited time offer!
              </p>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-0 text-sm sm:text-base transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-foreground hover:bg-foreground/90 text-primary font-bold py-2.5 sm:py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? 'Submitting...' : 'Claim 85% OFF'}
                </Button>
              </form>

              {/* Footer Text */}
              <p className="text-xs sm:text-sm text-foreground">
                No spam, unsubscribe anytime
              </p>
            </div>
          ) : (
            // Success Message
            <div className="space-y-4 text-center py-8 sm:py-12">
              <div className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-background/40 backdrop-blur-sm">
                <svg
                  className="h-6 w-6 sm:h-8 sm:w-8 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Success!
                </h3>
                <p className="text-sm sm:text-base text-foreground mt-2">
                  Check your email for your exclusive 85% discount code.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
