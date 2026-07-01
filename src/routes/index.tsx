import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";
import { CursorGlow } from "@/components/CursorGlow";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { GallerySection } from "@/components/GallerySection";
import {
  StoriesSection,
  ServicesSection,
  ProcessSection,
  GalleryMasonry,
  AboutSection,
  TestimonialsSection,
  InstagramSection,
  ContactSection,
  Footer,
} from "@/components/Sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <CursorGlow />
      <Navigation />
      <main>
        <Hero />
        <GallerySection />
        <StoriesSection />
        <ServicesSection />
        <ProcessSection />
        <GalleryMasonry />
        <AboutSection />
        <TestimonialsSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
