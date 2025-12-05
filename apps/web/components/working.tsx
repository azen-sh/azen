export default function Working() {
    const steps = [
      {
        number: "01",
        title: "Initialize",
        description: "Create your memory instance in seconds with simple configuration.",
      },
      { number: "02", title: "Store", description: "Push vectors and metadata. Automatic indexing happens instantly." },
      {
        number: "03",
        title: "Search",
        description: "Query with semantic similarity. Instant results with confidence scores.",
      },
      { number: "04", title: "Iterate", description: "Update and manage in real-time with complete version control." },
    ]
  
    return (
      <section id="how" className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Simple as 1, 2, 3, 4</h2>
            <p className="text-gray-400 text-lg font-light">Get from zero to production in minutes</p>
          </div>
  
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-zinc-900 border border-gray-800 flex items-center justify-center">
                    <span className="text-xl font-light text-white">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  