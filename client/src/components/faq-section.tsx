import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What documents do I need for a loan application?",
    answer: "For most loans, you'll need: Valid ID proof (Aadhaar, PAN), Address proof, Income documents (salary slips, bank statements), and specific documents based on loan type. Our AI system can often approve applications with minimal documentation.",
  },
  {
    id: 2,
    question: "How quickly can I get loan approval?",
    answer: "Our AI-powered system can provide instant pre-approval in seconds. Final approval typically takes 2-24 hours depending on the loan type and documentation completeness. Most personal loans are approved within 2 hours.",
  },
  {
    id: 3,
    question: "What are the eligibility criteria for loans?",
    answer: "General criteria include: Age 18-65 years, stable income source, good credit score (650+), and Indian citizenship. Specific requirements vary by loan type. We also consider alternative data for customers with limited credit history.",
  },
  {
    id: 4,
    question: "Are there any hidden charges or fees?",
    answer: "No, we believe in complete transparency. All charges including processing fees, prepayment charges, and late payment fees are clearly mentioned upfront. Our loan agreement contains all terms and conditions with no hidden surprises.",
  },
  {
    id: 5,
    question: "Can I prepay my loan without penalties?",
    answer: "Yes, we offer flexible prepayment options. Most of our personal loans have zero prepayment charges after 12 EMIs. For other loan types, prepayment charges are minimal and clearly disclosed at the time of loan approval.",
  },
];

export function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-800 dark:text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get answers to common questions about our loan services
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="glass-effect dark:glass-effect-dark rounded-2xl p-6 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => toggleItem(faq.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-4">
                  {faq.question}
                </h3>
                {openItem === faq.id ? (
                  <ChevronUp className="text-gray-600 dark:text-gray-400 transition-transform duration-300 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-gray-600 dark:text-gray-400 transition-transform duration-300 flex-shrink-0" />
                )}
              </div>
              
              <AnimatePresence>
                {openItem === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
