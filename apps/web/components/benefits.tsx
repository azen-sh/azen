export default function Benefits() {
    const benefits = [
      "99.99% uptime SLA",
      "Multi-region redundancy",
      "Automatic failover",
      "Rate limiting & quota",
      "WebSocket real-time",
      "Batch operations",
      "Custom indexing",
      "Advanced caching",
      "Webhook notifications",
      "GraphQL API",
      "All language SDKs",
      "Dedicated support",
    ]
  
    return (
      <section id="benefits" className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Enterprise Grade</h2>
            <p className="text-gray-400 text-lg font-light">Everything you need for production scale</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 text-gray-300">
                <span className="text-green-400">✓</span>
                <span className="font-light">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  