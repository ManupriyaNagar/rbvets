import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import RBVApart from "@/components/RBVApart";
import ProductSpotlight from "@/components/ProductSpotlight";
import Highlights from "@/components/Highlights";
import Feedback from "@/components/Feedback";
import Banner from "@/components/Banner";
import Petamour from "@/components/Petamour";
import DealsSection from "@/components/DealsSection";
import Mission from "@/components/Mission";
import ChoSection from "@/components/ChoSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <ChoSection />
      <div id="about" className="scroll-mt-20">
        <About />
      </div>
      <Mission />
      <RBVApart />
      <div id="products" className="scroll-mt-20">
        <ProductSpotlight />
      </div>
      <Highlights />
      <Banner />
      <Petamour />
      <DealsSection />
      <Feedback />
    </div>
  );
}




// mb from the well bred
// our mission font of para
// footer rbvetcare -> rbv
// contact page new 
