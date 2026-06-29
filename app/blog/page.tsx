'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function BlogPage() {
  const categories = ['All', 'Trading Tips', 'Market Analysis', 'Risk Management', 'Success Stories']

  const posts = [
    {
      title: '5 Essential Risk Management Rules for Prop Traders',
      category: 'Risk Management',
      excerpt: 'Learn the fundamentals of protecting your trading capital...',
      date: 'March 10, 2025',
    },
    {
      title: 'Technical Analysis 101: Candlesticks and Support/Resistance',
      category: 'Trading Tips',
      excerpt: 'Master the basics of reading price action and identifying key levels...',
      date: 'March 8, 2025',
    },
    {
      title: 'Market Analysis: USD/EUR Trends',
      category: 'Market Analysis',
      excerpt: 'Weekly breakdown of major currency pairs and trading opportunities...',
      date: 'March 5, 2025',
    },
    {
      title: 'From Challenge to Success: Alex\'s Journey',
      category: 'Success Stories',
      excerpt: 'How one trader turned $20 into consistent profitability...',
      date: 'March 1, 2025',
    },
    {
      title: 'Mastering Emotional Control in Trading',
      category: 'Trading Tips',
      excerpt: 'Psychology is the key to long-term trading success. Here\'s how...',
      date: 'February 28, 2025',
    },
    {
      title: 'Economic Calendar: Key Events This Month',
      category: 'Market Analysis',
      excerpt: 'Stay informed about major economic data releases affecting markets...',
      date: 'February 25, 2025',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070A18] via-[#0C1024] to-[#070A18]" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(110, 84, 255, 0.1) 0%, transparent 50%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="hero-title text-foreground mb-6 text-balance">
            CK Capital <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
            Trading insights, market analysis, and success stories from our community.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12" style={{ color: 'var(--foreground)'0000' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  idx === 0
                    ? 'bg-primary text-foreground'
                    : 'bg-card border border-border text-foreground hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <div className="glow-card border-primary/30 h-64 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-foreground text-xs font-bold mb-4" style={{ background: 'linear-gradient(to right in oklab, rgb(168, 123, 11) 0%, rgb(212, 175, 55) 50%, rgb(168, 123, 11) 100%)' }}>
                Featured
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-3" style={{ color: 'var(--foreground)'0303' }}>
                {posts[0].title}
              </h2>
              <p className="text-foreground text-lg">{posts[0].excerpt}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{posts[0].date}</span>
              <Link href="#" className="text-primary hover:text-[#7C5CFF] transition-colors">
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, idx) => {
              const titleColors = ['#171717', '#0d0c0c', '#0d0d0d', '#0b0b0b', '#161515'];
              const badgeColors = ['#f1efe9', '#f3f2ed', '#edebe6', '#f0ede7', '#f2f1ed'];
              return (
                <div key={idx} className="glow-card flex flex-col">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 w-fit" style={{ background: 'linear-gradient(to right in oklab, rgb(168, 123, 11) 0%, rgb(212, 175, 55) 50%, rgb(168, 123, 11) 100%)', color: badgeColors[idx] }}>
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-2 flex-1" style={{ color: titleColors[idx] }}>{post.title}</h3>
                  <p className="text-foreground text-sm mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <Link href="#" className="text-primary hover:text-[#7C5CFF] transition-colors">
                      Read →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
