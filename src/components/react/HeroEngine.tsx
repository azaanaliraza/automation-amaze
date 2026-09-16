import { useEffect, useState } from 'react';
import { CalendarCheck2, Database, MessageCircle, Sparkles, Check } from 'lucide-react';

type Scenario = {
  id: string;
  business: string;
  tag: string;
  channel: 'WhatsApp' | 'Website' | 'Instagram';
  message: string;
  reply: string;
  path: Array<'WhatsApp' | 'Calendar' | 'CRM'>;
  result: string;
  resultSub: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: 'dentist',
    business: 'Dental Clinic',
    tag: 'DENTIST',
    channel: 'WhatsApp',
    message: 'Can I book a cleaning tomorrow?',
    reply: 'Of course — we have 10:30 and 16:00 free. Shall I hold 10:30 for you?',
    path: ['Calendar', 'WhatsApp', 'CRM'],
    result: 'BOOKED ✓',
    resultSub: 'Tue 10:30 · Cleaning · reminder set',
  },
  {
    id: 'salon',
    business: 'Glow Salon',
    tag: 'SALON',
    channel: 'WhatsApp',
    message: 'Do you have an appointment at 6?',
    reply: 'Yes — 6:00 with Sara is open. Book it for you?',
    path: ['Calendar', 'WhatsApp'],
    result: 'BOOKED ✓',
    resultSub: 'Today 18:00 · Haircut · confirmed',
  },
  {
    id: 'realestate',
    business: 'Marina Realty',
    tag: 'REAL ESTATE',
    channel: 'Website',
    message: 'Is the 2BHK still available?',
    reply: 'It is. What budget and move-in date works? I can arrange a viewing.',
    path: ['CRM', 'WhatsApp'],
    result: 'NEW LEAD',
    resultSub: 'Qualified · viewing requested · agent notified',
  },
  {
    id: 'gym',
    business: 'Pulse Gym',
    tag: 'GYM',
    channel: 'Instagram',
    message: 'Can I come for a trial?',
    reply: 'Absolutely — free trial tomorrow at 8am or 6pm. Which suits you?',
    path: ['Calendar', 'CRM'],
    result: 'TRIAL BOOKED',
    resultSub: 'Wed 08:00 · trial pass sent',
  },
  {
    id: 'restaurant',
    business: 'Casa Verde',
    tag: 'RESTAURANT',
    channel: 'WhatsApp',
    message: 'Can I reserve a table for 4?',
    reply: 'Tonight at 8? We have a window table free — locking it in.',
    path: ['Calendar', 'WhatsApp'],
    result: 'RESERVED ✓',
    resultSub: 'Tonight 20:00 · 4 guests · confirmation sent',
  },
];

type Phase = 'message' | 'thinking' | 'reply' | 'automating' | 'done';

export default function HeroEngine() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('message');
  const [tick, setTick] = useState(0);
  const [reduced, setReduced] = useState(false);
  const s = SCENARIOS[idx % SCENARIOS.length]!;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase('done');
      return;
    }
    setPhase('message');
    const t1 = setTimeout(() => setPhase('thinking'), 1400);
    const t2 = setTimeout(() => setPhase('reply'), 2400);
    const t3 = setTimeout(() => setPhase('automating'), 3600);
    const t4 = setTimeout(() => setPhase('done'), 4800);
    const t5 = setTimeout(() => {
      setIdx((i) => (i + 1) % SCENARIOS.length);
      setTick((t) => t + 1);
    }, 6800);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [idx, reduced, tick]);

  const stage = (p: Phase) => {
    const order: Phase[] = ['message', 'thinking', 'reply', 'automating', 'done'];
    return order.indexOf(phase) >= order.indexOf(p);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#201A14]/10 bg-white/90 shadow-[0_40px_100px_-40px_rgba(74,58,35,0.35)] backdrop-blur-xl" aria-label="Live automation demo">
      {/* window bar */}
      <div className="flex items-center justify-between border-b border-[#201A14]/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#201A14]/40">business operating system</p>
        <p className="flex items-center gap-1.5 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#6E5334]">
          <span className="relative flex size-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#241C13] opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-[#241C13]" /></span>
          Live
        </p>
      </div>

      <div className="grid gap-0 sm:grid-cols-[1fr_210px]">
        {/* conversation */}
        <div className="p-4 sm:p-5 min-h-[340px]">
          <div className="mb-3 flex items-center gap-2">
            <span key={s.id} className="chat-in rounded-full border border-[#8A6A45]/30 bg-[#8A6A45]/10 px-2.5 py-1 font-mono2 text-[10px] uppercase tracking-[0.16em] text-[#6E5334]">{s.tag} · {s.channel}</span>
            <span className="font-mono2 text-[10px] text-[#201A14]/30">{s.business}</span>
          </div>

          <div className="space-y-3">
            {stage('message') && (
              <div key={`m-${idx}`} className="chat-in max-w-[85%] rounded-2xl rounded-tl-md bg-[#201A14]/[0.07] border border-[#201A14]/10 px-3.5 py-2.5 text-[14px] leading-snug text-[#201A14]/90">
                {s.message}
              </div>
            )}
            {stage('thinking') && !stage('reply') && (
              <div className="chat-in flex w-fit items-center gap-1.5 rounded-2xl rounded-tr-md border border-[#8A6A45]/20 bg-[#8A6A45]/[0.06] px-4 py-3">
                <span className="typing-dot size-1.5 rounded-full bg-[#241C13]" style={{ animationDelay: '0ms' }} />
                <span className="typing-dot size-1.5 rounded-full bg-[#241C13]" style={{ animationDelay: '150ms' }} />
                <span className="typing-dot size-1.5 rounded-full bg-[#241C13]" style={{ animationDelay: '300ms' }} />
                <span className="ml-1 font-mono2 text-[10px] uppercase tracking-widest text-[#201A14]/40">AI understanding…</span>
              </div>
            )}
            {stage('reply') && (
              <div key={`r-${idx}`} className="chat-in max-w-[88%] ml-auto rounded-2xl rounded-tr-md border border-[#8A6A45]/25 bg-[#8A6A45]/[0.08] px-3.5 py-2.5 text-[14px] leading-snug text-[#201A14]/90">
                <span className="mb-1 flex items-center gap-1 font-mono2 text-[10px] uppercase tracking-widest text-[#6E5334]"><Sparkles size={11} /> AI</span>
                {s.reply}
              </div>
            )}
            {stage('automating') && (
              <div key={`a-${idx}`} className="chat-in rounded-xl border border-[#201A14]/10 bg-[#EDE6D6] p-3 font-mono2 text-[11px] leading-relaxed">
                <p className="text-[#201A14]/40 uppercase tracking-widest text-[10px] mb-2">Automation trail</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {['MESSAGE', 'AI', ...s.path.map((p) => p.toUpperCase()), s.result].map((step, i, arr) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span className={i === arr.length - 1 ? 'rounded-md bg-[#241C13] px-2 py-1 text-[#FAF7F1] font-semibold' : i === 1 ? 'rounded-md border border-[#8A6A45]/40 px-2 py-1 text-[#6E5334]' : 'rounded-md border border-[#201A14]/15 px-2 py-1 text-[#201A14]/70'}>{step}</span>
                      {i < arr.length - 1 && <span className="text-[#6E5334]/60">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {stage('done') && (
              <div key={`d-${idx}`} className="chat-in flex items-center gap-3 rounded-xl border border-[#8A6A45]/30 bg-[#8A6A45]/10 px-3.5 py-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#241C13] text-[#FAF7F1]"><Check size={16} strokeWidth={3} /></span>
                <div>
                  <p className="font-display text-[15px] font-semibold text-[#6E5334]">{s.result}</p>
                  <p className="font-mono2 text-[11px] text-[#201A14]/55">{s.resultSub}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* automation rail */}
        <div className="border-t sm:border-t-0 sm:border-l border-[#201A14]/10 bg-[#F4EEE1] p-4 sm:p-5">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#201A14]/35 mb-3">Automation engine</p>
          <div className="space-y-2.5">
            <EngineNode icon={<MessageCircle size={14} />} label="AI Chatbot" sub="understands" active={stage('thinking')} done={stage('reply')} />
            <div className="mx-auto h-3 w-px bg-gradient-to-b from-[#8A6A45]/70 to-transparent" aria-hidden="true" />
            <EngineNode icon={<CalendarCheck2 size={14} />} label="Calendar" sub="syncs slots" active={stage('automating') && s.path.includes('Calendar')} done={stage('done') && s.path.includes('Calendar')} />
            <EngineNode icon={<Database size={14} />} label="CRM" sub="logs lead" active={stage('automating') && s.path.includes('CRM')} done={stage('done') && s.path.includes('CRM')} />
            <EngineNode icon={<MessageCircle size={14} />} label="WhatsApp" sub="confirms" active={stage('automating') && s.path.includes('WhatsApp')} done={stage('done') && s.path.includes('WhatsApp')} />
          </div>
          <div className="mt-4 flex gap-1.5" role="tablist" aria-label="Scenario selector">
            {SCENARIOS.map((sc, i) => (
              <button
                key={sc.id}
                role="tab"
                aria-selected={i === idx % SCENARIOS.length}
                aria-label={sc.business}
                onClick={() => setIdx(i)}
                className={`h-1 flex-1 rounded-full transition-all ${i === idx % SCENARIOS.length ? 'bg-[#241C13]' : 'bg-[#201A14]/15 hover:bg-[#201A14]/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EngineNode({ icon, label, sub, active, done }: { icon: React.ReactNode; label: string; sub: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-500 ${done ? 'border-[#8A6A45]/50 bg-[#8A6A45]/10' : active ? 'border-[#8A6A45]/40 bg-[#8A6A45]/[0.06] node-live' : 'border-[#201A14]/10 bg-[#201A14]/[0.03]'}`}>
      <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${done || active ? 'bg-[#241C13] text-[#FAF7F1]' : 'bg-[#201A14]/10 text-[#201A14]/60'}`}>{icon}</span>
      <div className="min-w-0">
        <p className={`text-[13px] font-medium leading-none ${done || active ? 'text-[#201A14]' : 'text-[#201A14]/60'}`}>{label}</p>
        <p className="mt-1 font-mono2 text-[10px] uppercase tracking-widest text-[#201A14]/35">{done ? 'done ✓' : sub}</p>
      </div>
    </div>
  );
}
