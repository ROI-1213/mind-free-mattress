import React from 'react';
import { CustomerStories } from './CustomerStories';
import { ScrollReveal } from '../motion/ScrollReveal';

export const BrandStoryExperience: React.FC = () => {
  return (
    <section
      id="why-choose-mindfree"
      className="relative w-full bg-[#F8FAFC] overflow-hidden select-none border-t border-[#E2E8F0] py-12 sm:py-16"
      aria-label="Customer Reviews & Testimonials"
    >
      <ScrollReveal variant="fade-up" duration={800} className="relative z-10">
        <CustomerStories />
      </ScrollReveal>
    </section>
  );
};
