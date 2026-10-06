/** Shared site constants. */
export const FOUNDERS = {
  azaan: {
    name: 'Azaan Ali Raza',
    role: 'Co-Founder · Growth Strategy',
    bio: 'Builds the patient-acquisition systems behind our client results — SEO, paid media, and funnels that turn searches into booked appointments.',
    initials: 'AR',
  },
  areeb: {
    name: 'Areeb Ali',
    role: 'Co-Founder · Marketing & Creative',
    bio: 'Owns brand, content and creative — the reason clinics look as considered online as they are in the treatment room.',
    initials: 'AA',
  },
} as const;

export const WHATSAPP_NUMBER = '919457007372';
export const WHATSAPP_TEXT = encodeURIComponent(
  'Hi Amaze Matrix! I run a clinic in the UAE or India and want more patients. Can we talk growth?'
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;
