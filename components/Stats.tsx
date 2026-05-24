export default function Stats() {
  return (
    <section className="bg-primary/5 px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">50K+</p>
            <p className="text-sm text-muted-foreground mt-2">Traders Globally</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">$1.2M</p>
            <p className="text-sm text-muted-foreground mt-2">Max Account Size</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground mt-2">Profit Split</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground mt-2">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
