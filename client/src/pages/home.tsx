import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { LoanCalculator } from "@/components/loan-calculator";
import { LoanCategories } from "@/components/loan-categories";
import { TrustSignals } from "@/components/trust-signals";
import { Testimonials } from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LoanCalculator />
      <LoanCategories />
      <TrustSignals />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}
