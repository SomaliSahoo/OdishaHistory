/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Map, ArrowRight, Mail, Landmark, Swords, Users, Menu, X, ChevronDown, Download, ChevronRight } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smart Sticky Header Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen font-sans selection:bg-odisha-red selection:text-white pb-16 md:pb-0">
      
      {/* A) HEADER NAVIGATION (Smart Sticky) */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled ? "bg-odisha-sand/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Landmark className="h-8 w-8 text-odisha-red" />
              <span className="font-serif font-bold text-2xl tracking-tight text-odisha-charcoal">
                Odisha<span className="text-odisha-red">Epic</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Dropdown: Eras */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-800 hover:text-odisha-red font-medium transition-colors py-2">
                  Eras <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="py-2">
                    <a href="#ancient" className="block px-4 py-2 text-sm text-gray-700 hover:bg-odisha-sand hover:text-odisha-red">Ancient Kalinga</a>
                    <a href="#medieval" className="block px-4 py-2 text-sm text-gray-700 hover:bg-odisha-sand hover:text-odisha-red">Medieval Golden Age</a>
                    <a href="#modern" className="block px-4 py-2 text-sm text-gray-700 hover:bg-odisha-sand hover:text-odisha-red">Modern Resistance</a>
                  </div>
                </div>
              </div>
              
              <a href="#dynasties" className="text-gray-800 hover:text-odisha-red font-medium transition-colors py-2">Dynasties</a>
              <a href="#culture" className="text-gray-800 hover:text-odisha-red font-medium transition-colors py-2">Culture</a>
              <a href="#places" className="text-gray-800 hover:text-odisha-red font-medium transition-colors py-2">Places</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <button className="bg-odisha-red text-white px-5 py-2.5 rounded-full font-medium hover:bg-red-800 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
                <Download className="w-4 h-4" /> Free Timeline
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-800 hover:text-odisha-red p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* B) MOBILE NAVIGATION (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Eras</h3>
                <div className="flex flex-col space-y-3 pl-2">
                  <a href="#ancient" className="text-xl font-serif text-gray-800">Ancient Kalinga</a>
                  <a href="#medieval" className="text-xl font-serif text-gray-800">Medieval Golden Age</a>
                  <a href="#modern" className="text-xl font-serif text-gray-800">Modern Resistance</a>
                </div>
              </div>
              <a href="#dynasties" className="text-xl font-serif text-gray-800 border-b border-gray-100 pb-4">Dynasties</a>
              <a href="#culture" className="text-xl font-serif text-gray-800 border-b border-gray-100 pb-4">Culture & Art</a>
              <a href="#places" className="text-xl font-serif text-gray-800 border-b border-gray-100 pb-4">Historical Places</a>
              
              <div className="pt-4">
                <button className="w-full bg-odisha-red text-white px-6 py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 shadow-xl shadow-red-900/20">
                  <Download className="w-5 h-5" /> Download Free Timeline
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* D) BREADCRUMBS EXAMPLE (Mock Article Header) */}
      <div className="pt-32 pb-8 bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-gray-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="#" className="hover:text-odisha-red transition-colors">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <a href="#" className="hover:text-odisha-red transition-colors">Medieval Odisha</a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <a href="#" className="hover:text-odisha-red transition-colors">Eastern Ganga Dynasty</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-gray-800">Narasimhadeva I</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-odisha-sand">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-odisha-red/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-odisha-red font-bold tracking-wider uppercase text-sm mb-4 block">
                Discover the Soul of India's East
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-odisha-charcoal leading-tight mb-6">
                The Empire That Changed <br className="hidden md:block" />
                <span className="text-odisha-red italic">Ashoka's Heart.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                From the bloody sands of the Kalinga War to the architectural marvels of Konark. 
                Dive into the untold epic of Odisha—a land of fierce warriors, master builders, and enduring resilience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-odisha-red text-white px-8 py-4 rounded-full font-medium hover:bg-red-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-900/20 hover:-translate-y-1">
                  Read the Kalinga Epic <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white text-odisha-charcoal border border-gray-300 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                  <Map className="w-5 h-5" /> Explore the Map
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* E) INTERNAL NAVIGATION (Related Articles / Continue Reading) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-serif font-bold text-odisha-charcoal">Continue Exploring</h2>
            <a href="#" className="text-odisha-red font-medium hover:text-red-800 flex items-center gap-1 text-sm">
              View all articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "The Mystery of Konark's Magnets", category: "Architecture", img: "https://picsum.photos/seed/konark2/600/400" },
              { title: "Kharavela: The Emperor Who Avenged Kalinga", category: "Ancient History", img: "https://picsum.photos/seed/cave/600/400" },
              { title: "Bali Yatra: The Greatest Maritime Festival", category: "Culture", img: "https://picsum.photos/seed/boat/600/400" }
            ].map((article, i) => (
              <a href="#" key={i} className="group block">
                <div className="overflow-hidden rounded-xl mb-4 relative aspect-[3/2]">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-odisha-charcoal uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-odisha-red transition-colors">{article.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Lead Magnet */}
      <section className="py-24 bg-odisha-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <BookOpen className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Get the Free "Dynasties of Odisha" PDF Cheat Sheet
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto">
            Perfect for UPSC aspirants and history buffs. Join 10,000+ readers getting weekly historical deep-dives straight to their inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-6 py-4 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
              required
            />
            <button 
              type="submit"
              className="bg-odisha-charcoal text-white px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Send My PDF <Mail className="w-5 h-5" />
            </button>
          </form>
          <p className="text-red-200 text-sm mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* C) FOOTER NAVIGATION */}
      <footer className="bg-odisha-charcoal text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-6">
                <Landmark className="h-6 w-6 text-odisha-red" />
                <span className="font-serif font-bold text-2xl text-white">
                  Odisha<span className="text-odisha-red">Epic</span>
                </span>
              </div>
              <p className="max-w-sm mb-6 leading-relaxed">
                Dedicated to preserving, exploring, and sharing the rich, untold history of Odisha with the world.
              </p>
              <div className="flex space-x-4">
                {/* Social Links placeholders */}
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-odisha-red hover:text-white transition-colors">X</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-odisha-red hover:text-white transition-colors">In</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-odisha-red hover:text-white transition-colors">Fb</a>
              </div>
            </div>
            
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Eras</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-odisha-red transition-colors">Ancient Kalinga</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Medieval Empires</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Modern History</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Pre-historic Sites</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-odisha-red transition-colors">UPSC Study Notes</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Interactive Maps</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Historical Timeline</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Dynasty Cheat Sheet</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-odisha-red transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Write for Us</a></li>
                <li><a href="#" className="hover:text-odisha-red transition-colors">Support Our Work</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2026 OdishaEpic. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* F) MOBILE STICKY BOTTOM CTA (Conversion Focused) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Free Resource</span>
          <span className="text-sm font-bold text-odisha-charcoal">Odisha History PDF</span>
        </div>
        <button className="bg-odisha-red text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-red-800 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Download
        </button>
      </div>

    </div>
  );
}
