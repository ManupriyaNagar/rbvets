import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import RBVApart from "@/components/RBVApart";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <About />
      <RBVApart />
    </div>
  );
}
