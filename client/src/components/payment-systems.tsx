import { motion } from "framer-motion";
import { CreditCard, Smartphone, University, Shield } from "lucide-react";

const paymentSystems = [
  { name: "Visa", icon: CreditCard, color: "text-blue-600" },
  { name: "MasterCard", icon: CreditCard, color: "text-red-600" },
  { name: "RuPay", icon: CreditCard, color: "text-orange-600" },
  { name: "American Express", icon: CreditCard, color: "text-green-600" },
  { name: "UPI", icon: Smartphone, color: "text-purple-600" },
  { name: "NetBanking", icon: University, color: "text-blue-700" },
];

export function PaymentSystems() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 dark:text-white mb-4">
            Secure Payment Options
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We support all major payment systems for your convenience
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {paymentSystems.map((system, index) => (
            <motion.div
              key={system.name}
              className="group flex flex-col items-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <system.icon className={`w-8 h-8 ${system.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {system.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center items-center mt-8 space-x-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">PCI DSS Compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}