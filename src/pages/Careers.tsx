import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useContent } from "@/hooks/use-content";
import { getIcon } from "@/lib/icon-map";

interface CareersContent {
  hero: { heading: string; subheading: string };
  benefits: { icon: string; title: string; description: string }[];
  currentOpportunitiesHeading: string;
  currentOpportunitiesText: string;
  ctaHeading: string;
  ctaSubtext: string;
}

const defaultContent: CareersContent = {
  hero: {
    heading: 'Join Our Global Team',
    subheading:
      "Build your career with one of Singapore's leading logistics companies. We're looking for passionate individuals to join our mission of connecting the world through exceptional logistics solutions.",
  },
  benefits: [
    { icon: 'Users', title: 'Collaborative Culture', description: 'Work with passionate professionals in a supportive environment that values teamwork and innovation.' },
    { icon: 'TrendingUp', title: 'Career Growth', description: 'Advance your career with continuous learning opportunities and clear progression paths.' },
    { icon: 'Heart', title: 'Work-Life Balance', description: 'Enjoy flexible working arrangements and comprehensive benefits that support your well-being.' },
    { icon: 'Globe', title: 'Global Opportunities', description: 'Be part of an international network with opportunities to work across different markets.' },
    { icon: 'Award', title: 'Recognition', description: 'Your contributions are valued and recognized through various reward and recognition programs.' },
    { icon: 'Target', title: 'Meaningful Impact', description: 'Make a real difference in global trade and logistics, connecting businesses worldwide.' },
  ],
  currentOpportunitiesHeading: 'Current Opportunities',
  currentOpportunitiesText: 'Career opportunities coming soon. Stay tuned!',
  ctaHeading: 'Ready to Start Your Journey?',
  ctaSubtext: "Don't see the right position? Send us your resume and we'll keep you in mind for future opportunities.",
};

const Careers = () => {
  const { content } = useContent('careers', defaultContent);

  return <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="from-brand-navy to-blue-700 text-white py-16 bg-[transbrand-navy] bg-brand-navy">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-50">
                {content.hero.heading}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {content.hero.subheading}
              </p>
              <Button variant="gold" size="lg" className="font-semibold">
                View Open Positions
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">Why Join Us</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {content.benefits.map((benefit, index) => {
                const Icon = getIcon(benefit.icon);
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-brand-navy/10 flex items-center justify-center mb-2">
                        <Icon className="h-6 w-6 text-brand-gold" />
                      </div>
                      <CardTitle>{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions (Updated to show Coming Soon) */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">{content.currentOpportunitiesHeading}</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore exciting career opportunities across our various departments and locations.
              </p>
            </motion.div>

            <div className="text-center text-gray-500 text-xl font-medium">{content.currentOpportunitiesText}</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-navy to-brand-navy text-white bg-brand-navy">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-slate-50">{content.ctaHeading}</h2>
              <p className="text-xl mb-8 text-blue-100">
                {content.ctaSubtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" size="lg" className="font-semibold">
                  Submit Your Resume
                </Button>
                <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-brand-navy">
                  Contact HR
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Careers;
