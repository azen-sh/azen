
export default function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload || payload.length === 0) return null;
  
    return (
      <div className="rounded-md border border-white/10 bg-black/80 px-3 py-2 text-xs backdrop-blur-md">
        <div className="text-neutral-300 mb-1">{label}</div>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white">{entry.name}:</span>
            <span className="text-neutral-300">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  