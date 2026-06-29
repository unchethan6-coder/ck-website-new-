'use client';

import { Button } from '@/components/ui/button';

export default function CommunitySection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Main Container */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Heading and Description */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Learn, grow and connect with traders worldwide, traders from 195 countries trust our platform
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed hidden sm:block">
                Join our vibrant community of successful traders sharing wins, strategies, and support.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 py-8 border-t-2 border-b-2 border-border">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-foreground">3 Million+</div>
                <div className="text-sm md:text-base text-muted-foreground">Traders</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-foreground">$253M+</div>
                <div className="text-sm md:text-base text-muted-foreground">Rewards Distributed</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              className="bg-primary hover:bg-primary/90 text-foreground font-bold py-3 px-8 rounded-lg text-base md:text-lg transition-all duration-300 w-full sm:w-auto"
              asChild
            >
              <a 
                href="https://discord.gg/ckcapital" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join Discord
              </a>
            </Button>
          </div>

          {/* Right Side - Discord Interface Mockup */}
          <div className="relative hidden md:block">
            {/* iPhone Frame */}
            <div className="relative mx-auto w-full max-w-sm">
              {/* Phone Bezel */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-3 border border-gray-700">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-3xl z-50"></div>

                {/* Screen */}
                <div className="bg-[#2C2F33] rounded-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-[#2C2F33] px-6 py-3 flex justify-between items-center text-white text-xs">
                    <span>10:24</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Discord Header */}
                  <div className="bg-[#23272A] px-4 py-3">
                    <div className="text-white font-bold text-sm"># | Rewards-Live-Updates</div>
                    <div className="text-gray-400 text-xs mt-1">CK Capital Community</div>
                  </div>

                  {/* Messages */}
                  <div className="bg-[#2C2F33] px-4 py-3 space-y-4 max-h-64 overflow-hidden">
                    {/* Message 1 */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F4D957] flex-shrink-0"></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-bold">CK Capital Bot</span>
                          <span className="text-gray-500 text-xs">2:49 PM</span>
                        </div>
                        <div className="text-gray-200 text-xs mt-1">🎉 An FP Trader from just secured a <span className="text-[#F4D957] font-bold">$4,093.86 reward!</span></div>
                      </div>
                    </div>

                    {/* Message 2 */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F4D957] flex-shrink-0"></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-bold">CK Capital Bot</span>
                          <span className="text-gray-500 text-xs">2:47 PM</span>
                        </div>
                        <div className="text-gray-200 text-xs mt-1">🎉 An FP Trader from just secured a <span className="text-[#F4D957] font-bold">$642.37 reward!</span></div>
                      </div>
                    </div>

                    {/* Message 3 */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F4D957] flex-shrink-0"></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-bold">CK Capital Bot</span>
                          <span className="text-gray-500 text-xs">2:45 PM</span>
                        </div>
                        <div className="text-gray-200 text-xs mt-1">🎉 An FP Trader from just secured a <span className="text-[#F4D957] font-bold">$514.60 reward!</span></div>
                      </div>
                    </div>

                    {/* Message 4 */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F4D957] flex-shrink-0"></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-bold">CK Capital Bot</span>
                          <span className="text-gray-500 text-xs">2:43 PM</span>
                        </div>
                        <div className="text-gray-200 text-xs mt-1">🎉 An FP Trader from just secured a <span className="text-[#F4D957] font-bold">$1,090.36 reward!</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="bg-[#23272A] px-4 py-3 border-t border-gray-700">
                    <div className="text-gray-500 text-xs">Compose message...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
