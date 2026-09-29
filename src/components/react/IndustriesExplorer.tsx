import { useState } from 'react';

type Industry = {
  id: string;
  label: string;
  example: string;
  reply: string;
  flow: string[];
};

const INDUSTRIES: Industry[] = [
  { id: 'ivf', label: 'IVF & Fertility', example: '“What is the success rate at your clinic?”', reply: 'Educational content + retargeting → free consultation booking', flow: ['Awareness', 'Google / Meta', 'Trust content', 'Consultation'] },
  { id: 'dental', label: 'Dental Clinics', example: '“How much is Invisalign in Dubai?”', reply: 'SEO + landing page → WhatsApp enquiry → booked appointment', flow: ['Search', 'SEO', 'Landing page', 'Booking'] },
  { id: 'aesthetic', label: 'Aesthetic Clinics', example: '“Do you do laser hair removal? Any offers?”', reply: 'Social campaigns + offers → DM automation → clinic visit', flow: ['Instagram', 'Ad creative', 'Offers', 'Visit'] },
  { id: 'medical', label: 'Medical Centres', example: '“Which doctor should I see for this?”', reply: 'Service-page SEO → online booking → reminders', flow: ['Search', 'Service pages', 'Booking', 'Reminders'] },
  { id: 'derma', label: 'Dermatology', example: '“Is this treatment safe for my skin type?”', reply: 'Before/after content + education → specialist consultation', flow: ['Social proof', 'Content', 'Trust', 'Consultation'] },
  { id: 'physio', label: 'Physiotherapy', example: '“I have lower back pain — can you help?”', reply: 'Local SEO + intake form → assessment booking', flow: ['Local search', 'Intake form', 'Assessment', 'Program'] },
  { id: 'mental', label: 'Mental Health', example: '“Do you offer online sessions?”', reply: 'Sensitive, private funnels → booked first session', flow: ['Google', 'Private funnel', 'First session', 'Care plan'] },
  { id: 'specialist', label: 'Specialist Practices', example: '“When is the next available appointment?”', reply: 'Authority content + ads → calendar booking', flow: ['Authority', 'Ads', 'Calendar', 'Patient'] },
];

export default function IndustriesExplorer() {
  const [active, setActive] = useState(INDUSTRIES[0]!);
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-wrap gap-2 content-start" role="tablist" aria-label="Healthcare industries">
        {INDUSTRIES.map((ind) => {
          const on = ind.id === active.id;
          return (
            <button
              key={ind.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(ind)}
              className={`min-h-[44px] rounded-full border px-4 py-2.5 font-display text-[15px] font-medium tracking-tight transition-all duration-300 ${
                on
                  ? 'border-[#8A6A45] bg-[#241C13] text-[#FAF7F1]'
                  : 'border-[#201A14]/12 bg-[#201A14]/[0.03] text-[#201A14]/65 hover:border-[#201A14]/30 hover:text-[#201A14]'
              }`}
            >
              {ind.label}
            </button>
          );
        })}
        <p className="mt-3 w-full text-[14px] text-[#201A14]/45">If your patients search online before they book, we can grow it.</p>
      </div>

      <div key={active.id} className="rounded-2xl border border-[#201A14]/10 bg-white p-5 sm:p-7">
        <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[#6E5334]">{active.label} · example growth play</p>
        <p className="chat-in mt-4 max-w-md rounded-2xl rounded-tl-md border border-[#201A14]/10 bg-[#201A14]/[0.06] px-4 py-3 text-[15px]">{active.example}</p>
        <p className="chat-in mt-2 max-w-md rounded-2xl rounded-tr-md border border-[#8A6A45]/25 bg-[#8A6A45]/[0.07] px-4 py-3 text-[14px] text-[#201A14]/85" style={{ animationDelay: '150ms' }}>{active.reply}</p>
        <div className="mt-5 rounded-xl border border-[#201A14]/10 bg-[#EDE6D6] p-4">
          <div className="flex flex-wrap items-center gap-1.5 font-mono2 text-[11px]">
            {active.flow.map((f, i, arr) => (
              <span key={i} className="chat-in flex items-center gap-1.5" style={{ animationDelay: `${i * 120}ms` }}>
                <span className={i === 0 ? 'rounded-md border border-[#201A14]/20 px-2 py-1 text-[#201A14]/75' : i === 2 ? 'rounded-md border border-[#8A6A45]/50 px-2 py-1 text-[#6E5334]' : i === arr.length - 1 ? 'rounded-md bg-[#241C13] px-2 py-1 font-semibold text-[#FAF7F1]' : 'rounded-md border border-[#201A14]/12 px-2 py-1 text-[#201A14]/60'}>{f}</span>
                {i < arr.length - 1 && <span className="text-[#6E5334]/60">→</span>}
              </span>
            ))}
          </div>
        </div>
        <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[#6E5334] hover:gap-3 transition-all">Grow my {active.label.toLowerCase()} practice →</a>
      </div>
    </div>
  );
}
