import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/use-content";
import { defaultHomeContent } from "@/lib/home-content-defaults";

const AboutUs = () => {
  const { content } = useContent("home-about", defaultHomeContent.aboutTeaser);

  return <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }} viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{content.heading}</h2>
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-gray-600 text-base text-justify ${index === content.paragraphs.length - 1 ? 'mb-6' : 'mb-4'}`}>
                {paragraph}
              </p>
            ))}
            <Link to="/about">
              <Button variant="outline" size="sm" className="text-sm bg-brand-gold my-0 mx-0 rounded-md font-semibold">
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Image Section */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg shadow-lg">
              <img alt="About Us" loading="lazy" className="w-full h-full object-cover rounded-lg" src={content.image} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default AboutUs;
