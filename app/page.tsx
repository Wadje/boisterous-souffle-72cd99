import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { SectionRail } from "@/components/SectionRail";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { ExtraServices } from "@/components/ExtraServices";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { BOTS, PACKAGES, WEBSITES } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <SectionRail />
      <CartDrawer />

      <main>
        <Hero />

        <ProductSection
          id="paketler"
          eyebrow="Paketlerimiz"
          title="Paketlerimiz"
          subtitle="Sunucunun ihtiyacına göre hazırlanmış, kuruluma hazır paketler."
          products={PACKAGES}
        />

        <ProductSection
          id="botlar"
          eyebrow="Botlarımız"
          title="Botlarımız"
          subtitle="Tek başına da alabileceğin güçlü ve modüler botlar."
          products={BOTS}
        />

        <ProductSection
          id="websiteler"
          eyebrow="Websiteler"
          title="Websiteler"
          subtitle="Sunucun için profesyonel, mağaza ve başvuru sistemli web siteleri."
          products={WEBSITES}
          cols="lg:grid-cols-2"
        />

        <ExtraServices />
        <Team />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
