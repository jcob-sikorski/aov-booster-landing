import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <--- IMPORT THIS

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
      
      {/* --- ADDED SEO BLOCK START --- */}
      <Helmet>
        <title>Privacy Policy | TaskLeap Bundles</title>
        <meta name="description" content="Privacy Policy for TaskLeap Bundles. Learn how we collect, use, and protect your Shopify store data." />
        <link rel="canonical" href="https://www.boostaov.com/privacy" />
        {/* Tells Google NOT to index this page if you prefer, or keep 'index' if you want it found */}
        <meta name="robots" content="index, follow" /> 
      </Helmet>
      {/* --- ADDED SEO BLOCK END --- */}

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
          <div className="p-8 md:p-12 border-b border-slate-100 bg-white">
            <h1 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium uppercase tracking-wider">
              <span>Updated on December 13, 2025</span>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8 text-lg leading-relaxed text-slate-600">
            {/* ... Content stays exactly as you wrote it ... */}
            <section>
              <p>
                <strong>TaskLeap Bundles ("the App”)</strong> providing custom cursor functionality ("the Service") to merchants who use Shopify to power their stores. This Privacy Policy describes how personal information is collected, used, and shared when you install or use the App in connection with your Shopify-supported store.
              </p>
            </section>
            
            {/* (I am abbreviating the middle content for brevity, paste your full content here) */}
            
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