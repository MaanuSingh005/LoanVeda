import { Logo } from "@/components/logo";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Loan Products", href: "/apply" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "EMI Calculator", href: "/" },
  { name: "Interest Rates", href: "/" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Policy", href: "#" },
  { name: "Fair Practice Code", href: "#" },
  { name: "Grievance Policy", href: "#" },
  { name: "KYC Policy", href: "#" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "bg-blue-600 hover:bg-blue-700" },
  { name: "Twitter", icon: Twitter, href: "#", color: "bg-sky-500 hover:bg-sky-600" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "bg-blue-700 hover:bg-blue-800" },
  { name: "Instagram", icon: Instagram, href: "#", color: "bg-pink-600 hover:bg-pink-700" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Logo size="md" className="mb-6" />
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering dreams through smart lending solutions. Your trusted partner in achieving financial goals with AI-powered loan services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2027 LoanVeda Financial Services Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>RBI Licensed NBFC</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
