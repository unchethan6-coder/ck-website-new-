export default function Stats() {
  return (
    <section className="bg-primary/5 px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">50K+</p>
            <p className="text-sm text-muted-foreground mt-2">Active Traders</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">$2B+</p>
            <p className="text-sm text-muted-foreground mt-2">Monthly Volume</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">98%</p>
            <p className="text-sm text-muted-foreground mt-2">Approval Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">24hrs</p>
            <p className="text-sm text-muted-foreground mt-2">Funding Time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
