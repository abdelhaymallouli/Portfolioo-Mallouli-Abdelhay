"use client";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Text & Info */}
        <div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-6 font-bold">
            // Get In Touch
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-950 dark:text-white leading-[0.9]">
            LET'S BUILD <br /> <span className="italic opacity-50">TOGETHER</span>.
          </h3>
          <p className="text-[var(--muted)] text-lg mb-12 max-w-md">
            I am currently open to new opportunities, collaborations, or just a friendly "hello."
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] group-hover:border-accent transition-colors">
                <Mail size={20} className="text-accent" />
              </div>
              <span className="font-mono text-sm">hello@yourname.dev</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] group-hover:border-accent transition-colors">
                <MapPin size={20} className="text-accent" />
              </div>
              <span className="font-mono text-sm">Global / Remote</span>
            </div>
          </div>
        </div>

        {/* Right Side: Premium Form */}
        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8 bg-[var(--card)] p-8 md:p-12 rounded-[3rem] border border-[var(--card-border)] shadow-[var(--shadow)]"
        >
          <div className="relative group">
            <input 
              type="text" 
              id="name"
              placeholder=" " 
              className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)]"
            />
            <label htmlFor="name" className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              YOUR NAME
            </label>
          </div>

          <div className="relative group">
            <input 
              type="email" 
              id="email"
              placeholder=" " 
              className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)]"
            />
            <label htmlFor="email" className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              EMAIL ADDRESS
            </label>
          </div>

          <div className="relative group">
            <textarea 
              id="message"
              placeholder=" " 
              rows={4}
              className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer resize-none text-[var(--foreground)]"
            />
            <label htmlFor="message" className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              PROJECT DETAILS
            </label>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-accent text-white rounded-2xl font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(99,102,241,0.3)] hover:shadow-accent/40 transition-all"
          >
            Send Message <Send size={18} />
          </motion.button>
        </motion.form>

      </div>
    </section>
  );
}