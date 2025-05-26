import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Users } from "lucide-react";
import { Link } from "wouter";

export function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const trustIndicators = [
    { icon: Shield, text: "100% Secure" },
    { icon: Clock, text: "2-Min Approval" },
    { icon: Users, text: "10L+ Happy Customers" },
  ];

  return (
    <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-90" />
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Modern financial cityscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-green-400/20 rounded-2xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-orange-500/30 rounded-lg"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white mb-6 leading-tight">
            Smart Loans for
            <br />
            <span className="text-green-400">Smart People</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto font-light">
            Get instant loan approvals with AI-powered credit assessment.
            Compare rates from 50+ lenders in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/apply">
              <Button
                size="lg"
                className="group bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Get Your Loan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="lg"
              className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.text}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <indicator.icon className="h-5 w-5 text-green-400" />
                <span className="font-medium">{indicator.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
