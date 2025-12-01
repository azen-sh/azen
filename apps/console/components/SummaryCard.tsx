
export default function SummaryCard({ title, value }: { title: string; value: number }) {
    return (
      <div className="rounded-xl bg-black/20 border border-neutral-800 p-4">
        <p className="text-xs text-neutral-400">{title}</p>
        <p className="text-xl text-white font-inter mt-1">{value}</p>
      </div>
    );
  }
  