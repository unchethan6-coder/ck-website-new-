import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EBE0] to-white px-4 py-20 md:py-40">
      <div className="container mx-auto max-w-5xl">
        <div className="text-left md:flex md:justify-between md:items-center gap-12">
          <div className="md:w-1/2">
            <span className="inline-block text-sm font-bold text-[#1a1a1a] mb-6">CK CAPITAL</span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-8">
              TRANSFORMING TRADERS INTO WINNERS GLOBALLY
            </h1>

            <div className="flex gap-6 mb-10">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-bold text-[#1a1a1a]">Up to 100%</p>
                  <p className="text-sm text-[#666666]">Profit Split</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-bold text-[#1a1a1a]">Up to $1.2M</p>
                  <p className="text-sm text-[#666666]">Funding Accounts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-bold text-[#1a1a1a]">Flexible</p>
                  <p className="text-sm text-[#666666]">Payouts Cycle</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-[#FFD700] hover:bg-[#FFC700] text-[#1a1a1a] font-bold text-base rounded-lg mb-12">
              Start Your Trading Journey Now
            </Button>
          </div>

          <div className="hidden md:block md:w-1/2 relative h-80">
            <div className="absolute inset-0 flex items-end justify-around gap-4">
              <div className="w-16 h-32 bg-gradient-to-t from-[#FFD700] to-[#FFF8E7] rounded opacity-80"></div>
              <div className="w-16 h-48 bg-gradient-to-t from-[#FFD700] to-[#FFF8E7] rounded opacity-90"></div>
              <div className="w-16 h-40 bg-gradient-to-t from-[#FFD700] to-[#FFF8E7] rounded opacity-75"></div>
              <div className="w-16 h-56 bg-gradient-to-t from-[#FFD700] to-[#FFF8E7] rounded opacity-85"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
