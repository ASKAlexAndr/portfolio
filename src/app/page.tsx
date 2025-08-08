import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="pb-16">
      <Hero />
      <About />
      <Skills />
      <Work />
      <Contact />
    </div>
  );
}
