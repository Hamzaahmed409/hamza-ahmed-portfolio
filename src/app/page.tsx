import { SiteHeader, SiteFooter } from "@/components/layout";
import {
  HeroSection,
  StatsSection,
  ExperienceSection,
  WorkSection,
  HowIWorkSection,
  StackSection,
  BackendSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="site-grain pointer-events-none fixed inset-0 z-[60]" />

      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ExperienceSection />
        <WorkSection />
        <HowIWorkSection />
        <StackSection />
        <BackendSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
