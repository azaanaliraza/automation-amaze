import { useEffect, useRef, useState } from 'react';
import { Send, RotateCcw, Check } from 'lucide-react';

type Biz = {
  id: string;
  label: string;
  priceQ: string;
  priceA: string;
  bookQ: string;
  slots: string[];
  confirm: string;
};

const BIZ: Biz[] = [
  { id: 'dentist', label: "I'm a Dentist", priceQ: 'How much is a consultation?', priceA: '[Example response based on configured clinic information — e.g. “Consultations are AED 150, redeemable against treatment.”]', bookQ: "I'd like to book.", slots: ['Tue 10:30', 'Tue 16:00', 'Wed 11:15'], confirm: 'Cleaning booked for Tue 10:30 — confirmation + reminder sent on WhatsApp.' },
  { id: 'salon', label: "I'm a Salon", priceQ: 'How much is a haircut + beard?', priceA: '[Example response based on configured price list — e.g. “Haircut AED 80, beard AED 40, combo AED 100.”]', bookQ: 'Book me for 6 today.', slots: ['Today 18:00 · Sara', 'Today 19:15 · Sara', 'Tomorrow 12:00'], confirm: 'Booked today 18:00 with Sara — confirmation sent.' },
  { id: 'gym', label: "I'm a Gym", priceQ: 'Do you offer a free trial?', priceA: '[Example response based on configured gym info — e.g. “Yes — one free trial session, trainer included.”]', bookQ: 'Sign me up for tomorrow morning.', slots: ['Wed 08:00', 'Wed 09:30', 'Wed 18:00'], confirm: 'Trial booked for Wed 08:00 — pass sent on WhatsApp.' },
  { id: 'realestate', label: "I'm a Real Estate Agent", priceQ: 'Is the 2BHK in Marina still available?', priceA: '[Example response based on configured listings — e.g. “Yes — AED 95k/yr, vacant now. Want a viewing?”]', bookQ: 'Yes, arrange a viewing.', slots: ['Thu 14:00', 'Thu 17:30', 'Fri 11:00'], confirm: 'Viewing requested for Thu 14:00 — agent notified with qualified lead notes.' },
  { id: 'restaurant', label: "I'm a Restaurant", priceQ: 'Do you have a table for 4 tonight?', priceA: '[Example response based on configured availability — e.g. “Yes — window tables free at 8 and 9:30.”]', bookQ: 'Reserve 8 for 4.', slots: ['Tonight 20:00', 'Tonight 21:30'], confirm: 'Table for 4 reserved tonight at 20:00 — confirmation sent.' },
  { id: 'other', label: 'Other', priceQ: 'Can AI handle our enquiries?', priceA: 'Yes — tell it your services, prices and hours once, and it answers, qualifies and books from there.', bookQ: 'Show me a booking.', slots: ['Demo call Tue 15:00', 'Demo call Wed 11:00'], confirm: 'Demo request logged — our team will confirm a time.' },
];

type Msg = { from: 'user' | 'ai' | 'sys'; text: string };

export default function LiveDemoChat() {
  const [biz, setBiz] = useState<Biz>(BIZ[0]!);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [slots, setSlots] = useState<string[] | null>(null);
  const [done, setDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const reset = (b: Biz) => {
    setBiz(b); setMsgs([]); setStep(0); setTyping(false); setSlots(null); setDone(false);
  };

  useEffect(() => { reset(BIZ[0]!); }, []);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  const aiSay = (text: string, delay = 900) =>
    new Promise<void>((res) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs((m) => [...m, { from: 'ai', text }]);
        res();
      }, delay);
    });

  const runScript = async (b: Biz, upto: number) => {
    if (upto === 0) {
      setMsgs([{ from: 'user', text: b.priceQ }]);
      await aiSay(b.priceA);
      setMsgs((m) => [...m, { from: 'user', text: b.bookQ }]);
      await aiSay('Checking availability…');
      setMsgs((m) => [...m, { from: 'sys', text: 'AI → Checking availability… → 3 slots found' }]);
      setSlots(b.slots);
      setStep(1);
    }
  };

  const pickSlot = async (slot: string) => {
    setMsgs((m) => [...m, { from: 'user', text: slot }]);
    setSlots(null);
    await aiSay('Booking…');
    setMsgs((m) => [...m, { from: 'sys', text: 'AI → Booking… → Appointment confirmed' }]);
    setMsgs((m) => [...m, { from: 'ai', text: `Done — ${biz.confirm.replace(/^.*?— /, '')}` }]);
    setDone(true);
    setStep(2);
  };

  const sendFree = async () => {
    if (!input.trim() || typing) return;
    const text = input.trim();
    setInput('');
    setMsgs((m) => [...m, { from: 'user', text }]);
    await aiSay('[Demo mode] Great question — in your live system the AI would answer from your real prices, hours and availability. Pick a slot above or book a demo to see your own data wired in.');
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#201A14]/10 bg-white">
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-[#201A14]/10 p-3 sm:flex-wrap" role="tablist" aria-label="Choose your business">
        {BIZ.map((b) => (
          <button key={b.id} role="tab" aria-selected={b.id === biz.id} onClick={() => reset(b)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition ${b.id === biz.id ? 'bg-[#241C13] text-[#FAF7F1]' : 'border border-[#201A14]/12 text-[#201A14]/60 hover:text-[#201A14] hover:border-[#201A14]/30'}`}>
            {b.label}
          </button>
        ))}
      </div>

      <div ref={boxRef} className="h-[340px] overflow-y-auto p-4 space-y-3" aria-live="polite">
        {msgs.length === 0 && !typing && (
          <div className="grid h-full place-items-center text-center">
            <div>
              <p className="font-display text-lg font-medium">Try the system ↓</p>
              <p className="mt-1 text-sm text-[#201A14]/50">Tap “Ask about pricing” to start a realistic conversation.</p>
              <button onClick={() => runScript(biz, 0)} className="btn-tactile mt-4 rounded-full bg-[#241C13] px-5 py-2.5 text-sm font-semibold text-[#FAF7F1]">Ask about pricing</button>
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`chat-in max-w-[85%] px-3.5 py-2.5 text-[14px] leading-snug ${
            m.from === 'user' ? 'ml-auto rounded-2xl rounded-tr-md border border-[#201A14]/10 bg-[#201A14]/[0.07]'
            : m.from === 'sys' ? 'mx-auto w-fit rounded-full border border-[#8A6A45]/25 bg-[#8A6A45]/[0.06] px-3 py-1.5 font-mono2 text-[11px] text-[#6E5334]'
            : 'rounded-2xl rounded-tl-md border border-[#8A6A45]/20 bg-[#8A6A45]/[0.06]'
          }`}>{m.text}</div>
        ))}
        {typing && (
          <div className="chat-in flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md border border-[#8A6A45]/20 bg-[#8A6A45]/[0.06] px-4 py-3">
            <span className="typing-dot size-1.5 rounded-full bg-[#241C13]" />
            <span className="typing-dot size-1.5 rounded-full bg-[#241C13]" style={{ animationDelay: '150ms' }} />
            <span className="typing-dot size-1.5 rounded-full bg-[#241C13]" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        {slots && (
          <div className="chat-in space-y-2">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.18em] text-[#201A14]/40">3 slots found — pick one:</p>
            {slots.map((s) => (
              <button key={s} onClick={() => pickSlot(s)} className="btn-tactile block w-full rounded-xl border border-[#8A6A45]/30 bg-[#8A6A45]/[0.06] px-4 py-2.5 text-left text-[14px] hover:bg-[#8A6A45]/[0.12]">📅 {s}</button>
            ))}
          </div>
        )}
        {done && (
          <div className="chat-in flex items-center gap-2.5 rounded-xl border border-[#8A6A45]/30 bg-[#8A6A45]/10 px-4 py-3">
            <span className="grid size-7 place-items-center rounded-full bg-[#241C13] text-[#FAF7F1]"><Check size={14} strokeWidth={3} /></span>
            <p className="text-[13px] text-[#201A14]/80">Calendar updated · CRM logged · WhatsApp confirmation sent</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-[#201A14]/10 p-3">
        <button onClick={() => reset(biz)} className="grid size-11 shrink-0 place-items-center rounded-full border border-[#201A14]/10 text-[#201A14]/50 hover:text-[#201A14]" aria-label="Restart demo"><RotateCcw size={15} /></button>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendFree()}
          placeholder="Type a message…" className="h-11 flex-1 rounded-full border border-[#201A14]/10 bg-[#201A14]/[0.04] px-4 text-[16px] sm:text-[14px] outline-none placeholder:text-[#201A14]/30 focus:border-[#8A6A45]/50" aria-label="Type a message" />
        <button onClick={sendFree} className="grid size-11 shrink-0 place-items-center rounded-full bg-[#241C13] text-[#FAF7F1]" aria-label="Send"><Send size={15} /></button>
      </div>
      <p className="border-t border-[#201A14]/[0.06] px-4 py-2 font-mono2 text-[10px] uppercase tracking-[0.16em] text-[#201A14]/30">Interactive demo with example responses — your live system uses your real business data</p>
    </div>
  );
}
