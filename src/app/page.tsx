import Image from "next/image";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Features from "@/components/Features";
import About from "@/components/About";
import RBVApart from "@/components/RBVApart";
import ProductSpotlight from "@/components/ProductSpotlight";
import Highlights from "@/components/Highlights";
import Feedback from "@/components/Feedback";
import ProductRow from "@/components/Products/ProductRow";
// import Banner from "@/components/Banner";
// import Petamour from "@/components/Petamour";
// import CategoryDealsWrapper from "@/components/CategoryDealsWrapper";
import Mission from "@/components/Mission";
import ChoSection from "@/components/ChoSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Mission />

      <Features />

      <div id="about" className="scroll-mt-20">

      </div>

      <RBVApart />
      <ChoSection />

      <div id="products" className="scroll-mt-20">
        <ProductSpotlight />
      </div>
      <Highlights />
      <ProductRow />
      {/* <Banner />

      <Petamour />
      <CategoryDealsWrapper /> */}
      <Feedback />
    </div>
  );
}




// mb from the well bred
// our mission font of para
// footer rbvetcare -> rbv
// contact page new 
