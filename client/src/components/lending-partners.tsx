import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const lendingPartners = [
  { name: "HDFC Bank", logo: "🏦", category: "Major Bank" },
  { name: "ICICI Bank", logo: "🏛️", category: "Private Bank" },
  { name: "Axis Bank", logo: "🏦", category: "Private Bank" },
  { name: "State Bank of India", logo: "🏛️", category: "Public Bank" },
  { name: "Kotak Mahindra Bank", logo: "🏦", category: "Private Bank" },
  { name: "IDFC First Bank", logo: "🏛️", category: "Private Bank" },
  { name: "Yes Bank", logo: "🏦", category: "Private Bank" },
  { name: "IndusInd Bank", logo: "🏛️", category: "Private Bank" },
  { name: "Bajaj Finserv", logo: "💳", category: "NBFC" },
  { name: "Tata Capital", logo: "🏢", category: "NBFC" },
  { name: "Mahindra Finance", logo: "🚗", category: "NBFC" },
  { name: "L&T Finance", logo: "🏗️", category: "NBFC" },
  { name: "Shriram Finance", logo: "💰", category: "NBFC" },
  { name: "Muthoot Finance", logo: "👑", category: "Gold Loan" },
  { name: "Manappuram Finance", logo: "💎", category: "Gold Loan" },
  { name: "IIFL Finance", logo: "📈", category: "NBFC" },
  { name: "Cholamandalam Finance", logo: "🚛", category: "Vehicle Finance" },
  { name: "Capital First", logo: "💼", category: "Personal Loan" },
  { name: "Fullerton India", logo: "🌟", category: "Personal Loan" },
  { name: "MoneyTap", logo: "📱", category: "Digital Lender" },
  { name: "CASHe", logo: "💸", category: "Digital Lender" },
  { name: "KreditBee", logo: "🐝", category: "Digital Lender" },
  { name: "PaySense", logo: "💳", category: "Digital Lender" },
  { name: "EarlySalary", logo: "⏰", category: "Salary Advance" },
  { name: "Navi", logo: "🧭", category: "Digital Bank" },
  { name: "Jupiter Money", logo: "🪐", category: "Digital Bank" },
  { name: "Fi Money", logo: "🎯", category: "Digital Bank" },
  { name: "NiYO", logo: "🎨", category: "Digital Bank" },
  { name: "RazorpayX", logo: "⚡", category: "Fintech" },
  { name: "Lendingkart", logo: "🛒", category: "Business Loan" },
];

export function LendingPartners() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-800 dark:text-white mb-4">
            Our <span className="gradient-text">Lending Partners</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Compare rates from 30+ trusted financial institutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {lendingPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Card className="group bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {partner.category}
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
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            And many more trusted partners to serve your financial needs
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">RBI Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Instant Approval</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Best Rates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}