import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Layout({
  title,
  description,
  sections,
}: {
  title: string
  description: string
  sections: {
    title: string
    content: string[]
  }[]
}) {
  return (
    <section className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-sm bg-white/10 text-[#E6E6E6]">
            Legal
          </span>

          <h1 className="text-4xl md:text-5xl font-light leading-tight text-[#E6E6E6] mb-4">
            {title}
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl">
            {description}
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, i) => (
            <Card
              key={i}
              className="
                rounded-2xl
                bg-[#0f1113]
                border border-neutral-900
                shadow-sm
                transition-all duration-300 ease-out
                hover:border-neutral-800
              "
            >
              <CardContent className="px-8 py-10">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-medium text-[#E6E6E6]">
                    {section.title}
                  </CardTitle>
                </CardHeader>

                <ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
                  {section.content.map((line, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-600 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
