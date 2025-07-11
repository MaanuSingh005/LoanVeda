import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState([500000]);
  const [tenure, setTenure] = useState("3");
  const [interestRate, setInterestRate] = useState("12");
  const [customRate, setCustomRate] = useState("");

  const calculateEMI = () => {
    const principal = loanAmount[0];
    const currentRate = interestRate === "custom" ? parseFloat(customRate) || 12 : parseFloat(interestRate);
    const rate = currentRate / 100 / 12;
    const months = parseInt(tenure) * 12;
    
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return Math.round(emi);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="relative -mt-24 z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect dark:glass-effect-dark rounded-3xl p-8 neumorphism dark:neumorphism-dark">
            <h3 className="text-2xl font-poppins font-bold text-center mb-6 text-gray-800 dark:text-white">
              Quick Loan Calculator
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loan Amount
                </label>
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  max={5000000}
                  min={10000}
                  step={10000}
                  className="w-full"
                />
                <div className="text-center mt-2 font-bold text-primary dark:text-primary-400">
                  {formatCurrency(loanAmount[0])}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tenure
                </label>
                <Select value={tenure} onValueChange={setTenure}>
                  <SelectTrigger className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="7">7 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate
                </label>
                <Select value={interestRate} onValueChange={setInterestRate}>
                  <SelectTrigger className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10.0%</SelectItem>
                    <SelectItem value="12">12.0%</SelectItem>
                    <SelectItem value="14">14.0%</SelectItem>
                    <SelectItem value="16">16.0%</SelectItem>
                    <SelectItem value="18">18.0%</SelectItem>
                    <SelectItem value="20">20.0%</SelectItem>
                    <SelectItem value="custom">Custom Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {interestRate === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom Rate (%)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter rate"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    min="1"
                    max="50"
                    step="0.1"
                  />
                </div>
              )}

              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-primary to-green-500 text-white p-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Calculate EMI
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <motion.div
                className="text-3xl font-bold text-primary dark:text-primary-400"
                key={calculateEMI()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatCurrency(calculateEMI())}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
