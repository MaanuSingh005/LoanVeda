import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  User,
  Briefcase,
  Home,
  Car,
  GraduationCap,
  Coins,
} from "lucide-react";

const loanCategories = [
  {
    id: "personal",
    title: "Personal Loan",
    description: "Quick funds for personal needs with minimal documentation",
    icon: User,
    amount: "₹50K - ₹40L",
    interest: "10.5% onwards",
    tenure: "12-60 months",
    gradient: "from-blue-500 to-blue-600",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: "business",
    title: "Business Loan",
    description: "Fuel your business growth with flexible loan options",
    icon: Briefcase,
    amount: "₹1L - ₹5Cr",
    interest: "11% onwards",
    tenure: "12-84 months",
    gradient: "from-green-500 to-green-600",
    buttonColor: "bg-green-500 hover:bg-green-600",
  },
  {
    id: "home",
    title: "Home Loan",
    description: "Make your dream home a reality with attractive rates",
    icon: Home,
    amount: "₹5L - ₹10Cr",
    interest: "8.5% onwards",
    tenure: "Up to 30 years",
    gradient: "from-orange-500 to-red-500",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
  },
  {
    id: "car",
    title: "Car Loan",
    description: "Drive your dream car with easy EMI options",
    icon: Car,
    amount: "₹1L - ₹2Cr",
    interest: "9% onwards",
    tenure: "12-84 months",
    gradient: "from-blue-500 to-purple-600",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: "education",
    title: "Education Loan",
    description: "Invest in your future with education financing",
    icon: GraduationCap,
    amount: "₹50K - ₹1.5Cr",
    interest: "9.5% onwards",
    tenure: "Up to 15 years",
    gradient: "from-green-500 to-teal-600",
    buttonColor: "bg-green-500 hover:bg-green-600",
  },
  {
    id: "gold",
    title: "Gold Loan",
    description: "Instant loan against your gold ornaments",
    icon: Coins,
    amount: "₹5K - ₹2Cr",
    interest: "7% onwards",
    tenure: "6-36 months",
    gradient: "from-yellow-500 to-orange-600",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600",
  },
];

export function LoanCategories() {
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
            Choose Your <span className="gradient-text">Perfect Loan</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From personal needs to business growth, we have the right loan solution for every requirement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 card-hover border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="text-white text-2xl" />
                </div>
                
                <h3 className="text-2xl font-poppins font-bold text-gray-800 dark:text-white mb-4">
                  {category.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  {category.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {category.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Interest:</span>
                    <span className="font-semibold text-green-600">
                      {category.interest}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tenure:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {category.tenure}
                    </span>
                  </div>
                </div>
                
                <Link href="/apply">
                  <Button className={`w-full ${category.buttonColor} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg`}>
                    Apply Now
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
