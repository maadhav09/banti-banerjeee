/*
 * CONTENT MANIFEST — single source of truth.
 * Update links / text / images here. No database or backend required.
 */
import heroImg from '@/assets/images/hero-igl.webp';
import iglImg from '@/assets/images/banti-igl.webp';
import posterImg from '@/assets/images/banti-poster.webp';
import pehchanPosterImg from '@/assets/images/pehchan-poster.webp';
import orangePune from '@/assets/images/orange-pune.webp';
import flowPune from '@/assets/images/flow-pune.webp';
import bloomBlr from '@/assets/images/bloom-blr.webp';
import audienceImg from '@/assets/images/audience.webp';
import wendysImg from '@/assets/images/wendys.webp';
import glaImg from '@/assets/images/gla.webp';
import weddingImg from '@/assets/images/wedding.webp';
import wofSuperstar from '@/assets/images/wof-superstar.webp';
import wofTable from '@/assets/images/wof-table.webp';
import familyShow1 from '@/assets/images/family-live-1.webp';
import familyShow2 from '@/assets/images/family-live-2.webp';
import familyShow3 from '@/assets/images/family-live-3.webp';
import reelThumb1 from '@/assets/images/reel-thumb-1.webp';
import reelThumb2 from '@/assets/images/reel-thumb-2.webp';
import reelThumb3 from '@/assets/images/reel-thumb-3.webp';

/* ---- SOCIAL & CONTACT ---- */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/bantibanerjee_',
  youtube: 'https://www.youtube.com/@bantibanerjee_comedian',
  bookingEmail: 'bbanerjee316@gmail.com',
  /*
   * EMAIL DELIVERY SETUP (Formspree — free tier):
   * 1. Go to https://formspree.io → sign up free
   * 2. Create a new form → set notification email to bbanerjee316@gmail.com
   * 3. Copy the endpoint URL (e.g. https://formspree.io/f/abc12345)
   * 4. Paste it below to enable direct form-to-email delivery
   */
  formspreeEndpoint: '',
  phone: '',
};

export const IMAGES = {
  hero: heroImg,
  igl: iglImg,
  poster: posterImg,
  pehchanPoster: pehchanPosterImg,
  badge: orangePune,
  familyShow: [familyShow1, familyShow2, familyShow3],
};

export const STRENGTHS = [
  'SHARP STORYTELLING',
  'OBSERVATIONAL HUMOUR',
  'UNCOMFORTABLE TRUTHS',
  'EMOTIONALLY INSIGHTFUL',
  'RELATABLE & EVERYDAY',
  'CONFIDENT STAGE PRESENCE',
  'CROSSES AUDIENCES',
];

export const GALLERY = [
  {
    id: 'pehchaan-pune',
    kicker: '01',
    title: 'PEHCHAAN — PUNE',
    subtitle: "Banti's solo show, on the road",
    items: [
      { src: orangePune, label: 'Orange Comedy Club', place: 'Pune', ratio: 'tall',
        alt: 'Banti Banerjee performing her solo show Pehchaan at Orange Comedy Club, Pune' },
      { src: flowPune, label: 'Flow Comedy Club', place: 'Pune', ratio: 'tall',
        alt: 'Banti Banerjee on stage at Flow Comedy Club, Pune' },
    ],
  },
  {
    id: 'pehchaan-blr',
    kicker: '02',
    title: 'PEHCHAAN — BENGALURU',
    subtitle: 'The Pehchaan journey continues',
    items: [
      { src: bloomBlr, label: 'Bloom Whitefield Comedy Club', place: 'Bengaluru', ratio: 'tall',
        alt: 'Banti Banerjee performing at Bloom Whitefield Comedy Club, Bengaluru' },
      { src: audienceImg, label: 'A full house', place: 'Live show', ratio: 'wide',
        alt: 'Banti Banerjee with the audience after a live comedy show' },
    ],
  },
  {
    id: 'corporate',
    kicker: '03',
    title: 'CORPORATE & SPECIAL',
    subtitle: 'Collaborations & special performances',
    items: [
      { src: wendysImg, label: "Wendy's", place: 'Brand collaboration', ratio: 'tall',
        alt: "Banti Banerjee performing at a Wendy's brand collaboration event" },
      { src: glaImg, label: 'GLA University', place: 'Campus show', ratio: 'tall',
        alt: 'Banti Banerjee performing for E-Cell at GLA University' },
      { src: weddingImg, label: 'Special event', place: 'Private celebration', ratio: 'tall',
        alt: 'Banti Banerjee performing at a private celebration' },
    ],
  },
  {
    id: 'tv-digital',
    kicker: '04',
    title: 'TELEVISION & DIGITAL',
    subtitle: 'On screen',
    items: [
      { src: iglImg, label: "India's Got Latent", place: 'Winner — Episode 10', ratio: 'wide',
        alt: "Banti Banerjee on India's Got Latent, Episode 10" },
      { src: wofSuperstar, label: 'Wheel of Fortune', place: 'Ghar Ki Superstar', ratio: 'wide',
        alt: 'Banti Banerjee appearance on Wheel of Fortune' },
      { src: wofTable, label: 'Wheel of Fortune', place: 'On the show', ratio: 'wide',
        alt: 'Banti Banerjee playing on Wheel of Fortune' },
    ],
  },
];

export const STATS = [
  { key: 'ig', label: 'Instagram Followers', end: 42.5, decimals: 1, suffix: 'K+', href: SOCIAL.instagram, cta: 'Follow on Instagram' },
  { key: 'yt', label: 'YouTube Subscribers', end: 12.1, decimals: 1, suffix: 'K+', href: SOCIAL.youtube, cta: 'Subscribe on YouTube' },
  { key: 'views', label: 'Total YouTube Views', end: 4152794, comma: true, href: SOCIAL.youtube, cta: 'Watch on YouTube' },
];

export const MEDIA = {
  /* 8 curated stand-up comedy performances — strictly comedy sets only */
  standup: [
    { title: 'Mummy, Kaisi Hai — A Stand-Up Comedy Special', url: 'https://www.youtube.com/watch?v=710PNOkDXL4', thumbnail: 'https://i.ytimg.com/vi/710PNOkDXL4/hqdefault.jpg' },
    { title: 'Stand-Up Comedy | Banti Banerjee', url: 'https://www.youtube.com/watch?v=VG7fvtmZUs4', thumbnail: 'https://i.ytimg.com/vi/VG7fvtmZUs4/hqdefault.jpg' },
    { title: 'Controversial Opinion | Stand up Comedy | Banti Banerjee', url: 'https://www.youtube.com/watch?v=R5L_PHNAios', thumbnail: 'https://i.ytimg.com/vi/R5L_PHNAios/hqdefault.jpg' },
    { title: 'Shaadi Ka The End | Stand Up Comedy | Banti Banerjee', url: 'https://www.youtube.com/watch?v=w0O3kq4MjY8', thumbnail: 'https://i.ytimg.com/vi/w0O3kq4MjY8/hqdefault.jpg' },
    { title: 'The C Section Epidemic | Stand Up Comedy | Banti Banerjee', url: 'https://www.youtube.com/watch?v=8yXi7TU9_9A', thumbnail: 'https://i.ytimg.com/vi/8yXi7TU9_9A/hqdefault.jpg' },
    { title: 'Dahej — Ek Prem Katha | Stand up Comedy | Banti Banerjee', url: 'https://www.youtube.com/watch?v=AlvFPeoV31U', thumbnail: 'https://i.ytimg.com/vi/AlvFPeoV31U/hqdefault.jpg' },
    { title: 'When Couple Therapist Starts Judging You | Stand up Comedy | Banti Banerjee', url: 'https://www.youtube.com/watch?v=0NjTdxkaVU0', thumbnail: 'https://i.ytimg.com/vi/0NjTdxkaVU0/hqdefault.jpg' },
    { title: 'Not so Pyari Mummy | Stand Up Comedy | Banti Banerjee', url: 'https://www.youtube.com/watch?v=ojLYb1ZeW8M', thumbnail: 'https://i.ytimg.com/vi/ojLYb1ZeW8M/hqdefault.jpg' },
  ],
  /* 6 stand-up comedy shorts only */
  shorts: [
    { title: 'C Section Epidemic — Stand-up Comedy', url: 'https://www.youtube.com/shorts/oiWoK-oPMa0', thumbnail: 'https://i.ytimg.com/vi/oiWoK-oPMa0/oardefault.jpg' },
    { title: 'Allergies — Stand-up Comedy', url: 'https://www.youtube.com/shorts/8Tqdp37DWwE', thumbnail: 'https://i.ytimg.com/vi/8Tqdp37DWwE/oardefault.jpg' },
    { title: 'Chaddha Joke', url: 'https://www.youtube.com/shorts/c2QSGd3asbU', thumbnail: 'https://i.ytimg.com/vi/c2QSGd3asbU/oardefault.jpg' },
    { title: "Arrange Marriage That Didn't Happen", url: 'https://www.youtube.com/shorts/HwAblkO7bAU', thumbnail: 'https://i.ytimg.com/vi/HwAblkO7bAU/oardefault.jpg' },
    { title: 'Stand-up Comedy Short', url: 'https://www.youtube.com/shorts/txRZS4ju0Cw', thumbnail: 'https://i.ytimg.com/vi/txRZS4ju0Cw/oardefault.jpg' },
    { title: 'Stand-up Comedy Short', url: 'https://www.youtube.com/shorts/QWIS9t66Ymg', thumbnail: 'https://i.ytimg.com/vi/QWIS9t66Ymg/oardefault.jpg' },
  ],
  /* Instagram Reels — using provided thumbnail images */
  reels: [
    { title: 'Stand-up Reel', url: 'https://www.instagram.com/reel/DaMzsKjsvc7/', thumbnail: reelThumb1 },
    { title: 'Stand-up Reel', url: 'https://www.instagram.com/reel/DacgZ-fPByC/', thumbnail: reelThumb2 },
    { title: 'Stand-up Reel', url: 'https://www.instagram.com/reel/DZ4K8rhMwbq/', thumbnail: reelThumb3 },
  ],
};
export const OCCASIONS = [
  'Corporate Events', 'Brand Roasts', 'Weddings', 'Baby Showers', 'Birthdays', 'Divorce Parties',
];
