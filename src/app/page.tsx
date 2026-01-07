import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import RBVApart from "@/components/RBVApart";
import ProductSpotlight from "@/components/ProductSpotlight";
import Highlights from "@/components/Highlights";
import Feedback from "@/components/Feedback";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <div id="about" className="scroll-mt-20"><About /></div>

      <RBVApart />
      <div id="products" className="scroll-mt-20">   <ProductSpotlight /></div>

      <Highlights />
      <Feedback />
    </div>
  );
}
