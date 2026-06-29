export default function WhyChooseUs() {
  const reasons = [
    {
      title: 'Transparent & Fair',
      description: 'Clear trading rules with no hidden fees. You know exactly what to expect at every step',
    },
    {
      title: 'Multiple Account Sizes',
      description: 'Start from $2,500 to $100,000+ in the challenge phase, scaling up to $1.2M as a CK Trader',
    },
    {
      title: 'Proven Track Record',
      description: 'Trusted by 50,000+ traders globally who have successfully scaled their accounts',
    },
    {
      title: 'Professional Infrastructure',
      description: 'Trade on institutional-grade platforms with advanced tools and real market conditions',
    },
    {
      title: 'Risk Management Focus',
      description: 'Strict risk management rules protect your capital while allowing profitable trading strategies',
    },
    {
      title: 'Community Support',
      description: 'Join our active Discord community with daily market analysis and trader support',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-muted">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Why Choose CK Capital?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Industry-leading features that support your trading success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-card p-4 sm:p-5 md:p-6 rounded-lg border border-border hover:border-primary transition-colors duration-200 h-full flex flex-col">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                <span className="text-lg sm:text-xl font-bold text-foreground">{idx + 1}</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-2 sm:mb-3">{reason.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed flex-grow">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
