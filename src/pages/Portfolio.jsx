import { useLenis } from '@/hooks/useLenis';
import { Toaster } from '@/components/ui/sonner';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import MeetBanti from '@/components/MeetBanti';
import ArtOfBeing from '@/components/ArtOfBeing';
import Gallery from '@/components/Gallery';
import FamilyShow from '@/components/FamilyShow';
import Stats from '@/components/Stats';
import WatchBanti from '@/components/WatchBanti';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

export default function Portfolio() {
  useLenis();
  return (
    <div className="grain relative bg-ink text-ivory antialiased">
      <Nav />
      <main>
        <Hero />
        <MeetBanti />
        <ArtOfBeing />
        <Gallery />
        <FamilyShow />
        <Stats />
        <WatchBanti />
        <Booking />
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}
