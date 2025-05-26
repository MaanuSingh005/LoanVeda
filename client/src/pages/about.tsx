import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const features = [
  "RBI Licensed NBFC",
  "AI-Powered Credit Assessment",
  "50+ Banking Partners",
  "24/7 Customer Support",
];

const stats = [
  { value: "99.2%", label: "Customer Satisfaction" },
  { value: "3+ Years", label: "Industry Experience" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-800 dark:text-white mb-4">
              About <span className="gradient-text">LoanVeda</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Revolutionizing the lending industry with AI-powered solutions and customer-first approach
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-poppins font-bold text-gray-800 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                At LoanVeda, we're on a mission to democratize access to credit by leveraging cutting-edge AI technology and data science. We believe everyone deserves fair and transparent lending solutions.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Founded in 2021, we've already helped over 10 lakh customers achieve their financial goals through our innovative lending marketplace that connects borrowers with the best lenders across India.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern financial technology team"
                className="rounded-3xl shadow-2xl w-full"
              />
              
              {/* Floating stats cards */}
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`absolute ${index === 0 ? '-bottom-8 -left-8' : '-top-8 -right-8'} bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl glass-effect dark:glass-effect-dark`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                >
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${index === 0 ? 'text-primary' : 'text-green-600'} dark:text-primary-400`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
