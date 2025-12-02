export default function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-xl 
        border border-neutral-800 
        bg-linear-to-b from-[#101011] to-[#0c0c0d]
        p-4 transition-all duration-300
        hover:border-neutral-700 hover:shadow-[0_0_18px_rgba(255,255,255,0.04)]
      "
    >
      <div
        className="
          absolute inset-0 rounded-xl bg-linear-to-r 
          from-white/5 via-white/0 to-white/5 opacity-0 
          group-hover:opacity-5 blur-xl transition-opacity duration-500
        "
      />

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neutral-700/30 to-transparent" />

      <p className="text-[11px] font-medium text-neutral-400 tracking-wide relative z-10">
        {title}
      </p>

      <p className="text-2xl text-white mt-2 relative z-10">
        {value}
      </p>
    </div>
  );
}
