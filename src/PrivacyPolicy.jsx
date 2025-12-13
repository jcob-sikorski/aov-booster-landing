// src/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegalNavbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 py-4">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-lg overflow-hidden">
          <img 
            src="https://ucarecdn.com/52f868d5-f61f-4380-b350-7651ff684aad/-/preview/1000x1000/" 
            alt="Logo" 
            className="w-full h-full object-cover" 
          />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">
          TaskLeap Bundles
        </span>
      </Link>

      <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  </nav>
);

const LegalFooter = () => (
  <footer className="bg-white border-t border-slate-100 pt-12 pb-8 mt-auto">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} TaskLeap Bundles. All rights reserved.
        </div>
        <div className="flex gap-4">
           {/* Add your actual social links here if needed */}
           <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer">
              <Linkedin size={16} />
           </div>
           <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer">
              <Youtube size={16} />
           </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-indigo-100 selection:text-indigo-900 text-slate-600 flex flex-col">
      <LegalNavbar />

      <main className="pt-32 pb-24 px-6 relative overflow-hidden flex-grow">
        {/* Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-slate-100 bg-white">
            <h1 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium uppercase tracking-wider">
              <span>Updated on December 13, 2025</span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-12 space-y-8 text-lg leading-relaxed text-slate-600">
            
            <section>
              <p>
                <strong>TaskLeap Bundles ("the App”)</strong> providing custom cursor functionality ("the Service") to merchants who use Shopify to power their stores. This Privacy Policy describes how personal information is collected, used, and shared when you install or use the App in connection with your Shopify-supported store.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Personal Information the App Collects</h3>
              <p className="mb-4">
                When you install the App, we are automatically able to access certain types of information from your Shopify account:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <li>Store URL</li>
                <li>Store owner email address</li>
                <li>Installed themes</li>
              </ul>
              <p className="mt-4">
                We collect personal information directly from the relevant individual, through your Shopify account, or using the following technologies:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>
                  <strong>“Cookies”</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org" className="text-indigo-600 hover:underline">http://www.allaboutcookies.org</a>.
                </li>
                <li>
                  <strong>“Log files”</strong> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
                </li>
                <li>
                  <strong>“Web beacons,” “tags,” and “pixels”</strong> are electronic files used to record information about how you browse the Site.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">How Do We Use Your Personal Information?</h3>
              <p>
                We use the personal information we collect from you and your customers in order to provide the Service and to operate the App. Additionally, we use this personal information to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Communicate with you;</li>
                <li>Optimize or improve the App; and</li>
                <li>Provide you with information or advertising relating to our products or services.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Sharing Your Personal Information</h3>
              <p>
                We also share some of the Personal information with PostHog Inc. to analyze our customers and provide better experience. Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Your Rights</h3>
              <p className="mb-4">
                If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
              </p>
              <p>
                Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Data Retention</h3>
              <p>
                When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Changes</h3>
              <p>
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
              </p>
            </section>

            <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mt-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Mail className="text-indigo-600" size={20} /> Contact Us
              </h3>
              <p>
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at:
              </p>
              <a href="mailto:jm.siekiera@gmail.com" className="text-lg font-bold text-indigo-600 hover:underline mt-2 inline-block">
                jm.siekiera@gmail.com
              </a>
            </section>

          </div>
        </motion.div>
      </main>

      <LegalFooter />
    </div>
  );
}