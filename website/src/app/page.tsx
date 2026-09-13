import { Closing } from "../components/closing";
import { Faq } from "../components/faq";
import { Features } from "../components/features";
import { Footer } from "../components/footer";
import { Gallery } from "../components/gallery";
import { Hero } from "../components/hero";
import { Install } from "../components/install";
import { Keyboard } from "../components/keyboard";
import { Nav } from "../components/nav";
import { Privacy } from "../components/privacy";
import { Switch } from "../components/switch";
import { ScrollTop } from "../components/ui/scroll-top";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl">
        <Hero />
        <Features />
        <Gallery />
        <Privacy />
        <Keyboard />
        <Switch />
        <Install />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
