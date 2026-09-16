import { useState } from 'react';

export default function ROICalculator() {
  const [enquiries, setEnquiries] = useState(300);
  const [value, setValue] = useState(500);
  const [rate, setRate] = useState(10);
  const [response, setResponse] = useState(60);

  const bookings = Math.round((enquiries * rate) / 100);
  const pipeline = enquiries * value;
  const captured = bookings * value;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-6 rounded-2xl border border-[#201A14]/10 bg-white p-6">
        <Slider label="Monthly enquiries" value={enquiries} min={20} max={2000} step={10} onChange={setEnquiries} display={String(enquiries)} />
        <Slider label="Average customer value (AED)" value={value} min={50} max={10000} step={50} onChange={setValue} display={`AED ${value.toLocaleString()}`} />
        <Slider label="Current booking rate" value={rate} min={1} max={60} step={1} onChange={setRate} display={`${rate}%`} />
        <Slider label="Current response time (minutes)" value={response} min={1} max={480} step={5} onChange={setResponse} display={response >= 60 ? `${Math.floor(response / 60)}h ${response % 60}m` : `${response}m`} />
        <p className="font-mono2 text-[11px] uppercase tracking-[0.16em] text-[#201A14]/30">All calculations are illustrative estimates — not guarantees</p>
      </div>
      <div className="rounded-2xl border border-[#8A6A45]/25 bg-gradient-to-b from-[#8A6A45]/[0.08] to-transparent p-6">
        <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[#6E5334]">Your opportunity snapshot</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat label="Monthly enquiries" value={String(enquiries)} />
          <Stat label="Potential pipeline" value={`AED ${(pipeline / 1000).toFixed(0)}k`} />
          <Stat label="Est. bookings" value={String(bookings)} highlight />
          <Stat label="Est. captured value" value={`AED ${(captured / 1000).toFixed(1)}k`} highlight />
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-[#201A14]/55">
          At a {rate}% booking rate, ~{bookings} of {enquiries} enquiries become customers. Faster responses and automatic follow-ups exist to push that rate up — every missed reply is pipeline left on the table.
        </p>
        <a href="#book" className="btn-tactile mt-5 inline-flex items-center gap-2 rounded-full bg-[#241C13] px-6 py-3 text-sm font-semibold text-[#FAF7F1]">Calculate Your Opportunity <span className="arr">→</span></a>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, display, onChange }: { label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-[14px]"><span className="text-[#201A14]/70">{label}</span><span className="font-display font-semibold text-[#6E5334]">{display}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#8A6A45]" aria-label={label} />
    </label>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? 'border-[#8A6A45]/40 bg-[#8A6A45]/[0.07]' : 'border-[#201A14]/10 bg-[#201A14]/[0.03]'}`}>
      <p className={`font-display text-2xl font-semibold tracking-tight ${highlight ? 'text-[#6E5334]' : 'text-[#201A14]'}`}>{value}</p>
      <p className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.16em] text-[#201A14]/40">{label}</p>
    </div>
  );
}
