import { useState } from 'react';

type Industry = {
  id: string;
  label: string;
  example: string;
  reply: string;
  flow: string[];
};

const INDUSTRIES: Industry[] = [
  { id: 'dentists', label: 'Dentists', example: '“Can I book a cleaning tomorrow?”', reply: 'AI checks chair availability → books → sends reminders', flow: ['Patient', 'WhatsApp', 'AI', 'Service', 'Availability', 'Appointment'] },
  { id: 'salons', label: 'Salons', example: '“Do you have a slot at 6 today?”', reply: 'AI matches stylist + service → confirms in seconds', flow: ['Customer', 'Instagram / WhatsApp', 'AI', 'Service selection', 'Calendar', 'Booking'] },
  { id: 'clinics', label: 'Clinics', example: '“Do you treat back pain? What are timings?”', reply: 'AI answers FAQs → triages → books the right doctor', flow: ['Patient', 'Website', 'AI', 'Triage', 'Doctor match', 'Appointment'] },
  { id: 'gyms', label: 'Gyms', example: '“Can I come for a trial?”', reply: 'AI offers trial slots → registers → follows up', flow: ['Prospect', 'Instagram', 'AI', 'Trial offer', 'Registration', 'Follow-up'] },
  { id: 'realestate', label: 'Real Estate', example: '“Is the 2BHK still available?”', reply: 'AI qualifies budget + timeline → notifies agent', flow: ['Lead', 'Website', 'AI', 'Property preference', 'Qualification', 'Agent notification'] },
  { id: 'restaurants', label: 'Restaurants', example: '“Table for 4 tonight?”', reply: 'AI checks covers → reserves → confirms on WhatsApp', flow: ['Guest', 'WhatsApp', 'AI', 'Party size', 'Table map', 'Reservation'] },
  { id: 'cardealers', label: 'Car Dealers', example: '“Is the test drive available Saturday?”', reply: 'AI qualifies intent → schedules test drive', flow: ['Buyer', 'Website', 'AI', 'Model interest', 'Qualification', 'Test drive'] },
  { id: 'beauty', label: 'Beauty', example: '“How much is laser? Any offers?”', reply: 'AI shares packages → books consultation', flow: ['Client', 'WhatsApp', 'AI', 'Treatment', 'Package', 'Consultation'] },
  { id: 'homeservices', label: 'Home Services', example: '“Can someone fix my AC today?”', reply: 'AI captures address + issue → dispatches job', flow: ['Homeowner', 'Phone / WhatsApp', 'AI', 'Issue', 'Slot', 'Job booked'] },
  { id: 'coaching', label: 'Coaching', example: '“What are the batch timings?”', reply: 'AI shares batches → enrols → collects fees info', flow: ['Student', 'Website', 'AI', 'Course', 'Batch', 'Enrolment'] },
];

export default function IndustriesExplorer() {
  const [active, setActive] = useState(INDUSTRIES[0]!);
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-wrap gap-2 content-start" role="tablist" aria-label="Industries">
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
        <p className="mt-3 w-full text-[14px] text-[#201A14]/45">If your customers message you, we can automate it.</p>
      </div>

      <div key={active.id} className="rounded-2xl border border-[#201A14]/10 bg-white p-5 sm:p-7">
        <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-[#6E5334]">{active.label} · example workflow</p>
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
        <a href="#book" className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-[#6E5334] hover:gap-3 transition-all">Automate my {active.label.toLowerCase()} workflow →</a>
      </div>
    </div>
  );
}
