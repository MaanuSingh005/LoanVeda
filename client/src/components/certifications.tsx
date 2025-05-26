import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Shield, Award, CheckCircle, FileCheck, Star, Zap } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "RBI Compliant NBFC",
    description: "Licensed & Regulated",
    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    badge: "Verified",
  },
  {
    icon: Award,
    title: "ISO 27001 Certified",
    description: "Information Security",
    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    badge: "Certified",
  },
  {
    icon: Star,
    title: "Trusted Fintech 2025",
    description: "Industry Recognition",
    color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
    badge: "Awarded",
  },
  {
    icon: CheckCircle,
    title: "CIBIL Verified",
    description: "Credit Bureau Partner",
    color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    badge: "Partner",
  },
  {
    icon: FileCheck,
    title: "DigiLocker Ready",
    description: "Document Verification",
    color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400",
    badge: "Integrated",
  },
  {
    icon: Zap,
    title: "UIDAI Verified",
    description: "Aadhaar Authentication",
    color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    badge: "Verified",
  },
];

export function Certifications() {
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
            Certified & <span className="gradient-text">Trusted</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Backed by official certifications and regulatory compliance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group bg-white dark:bg-gray-900 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 card-hover border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${cert.color.split(' ')[0]} ${cert.color.split(' ')[1]} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <cert.icon className={`w-10 h-10 ${cert.color.split(' ').slice(2).join(' ')}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold animate-bounce">
                    {cert.badge}
                  </div>
                </div>
                
                <h3 className="text-xl font-poppins font-bold text-gray-800 dark:text-white mb-3">
                  {cert.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  {cert.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-4 bg-green-50 dark:bg-green-900/20 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 dark:text-green-400 font-semibold">
              All certifications verified and up-to-date
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}