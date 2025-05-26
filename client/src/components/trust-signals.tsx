import { motion } from "framer-motion";
import { Shield, Award, Star, Clock } from "lucide-react";

const trustBadges = [
  {
    icon: Shield,
    title: "SSL Secured",
    description: "256-bit encryption",
    color: "bg-green-500",
  },
  {
    icon: Award,
    title: "RBI Approved",
    description: "Licensed NBFC",
    color: "bg-blue-500",
  },
  {
    icon: Star,
    title: "4.8/5 Rating",
    description: "50K+ reviews",
    color: "bg-orange-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always available",
    color: "bg-purple-500",
  },
];

const statistics = [
  { value: "10L+", label: "Happy Customers", color: "text-blue-600 dark:text-blue-400" },
  { value: "₹5000Cr+", label: "Loans Disbursed", color: "text-green-600" },
  { value: "50+", label: "Banking Partners", color: "text-orange-600" },
  { value: "500+", label: "Cities Served", color: "text-purple-600" },
];

export function TrustSignals() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-800 dark:text-white mb-4">
            Trusted by <span className="gradient-text">Millions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your security and trust are our top priorities
          </p>
        </motion.div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              className="text-center p-6 rounded-2xl glass-effect dark:glass-effect-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <badge.icon className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
