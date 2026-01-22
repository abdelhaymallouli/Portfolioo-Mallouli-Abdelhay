"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { ME } from "@/data/portfolio";


export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Fetch values from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
    console.error("Environment variables are missing!");
    return;
  }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );
      
      setStatus("success");
      formRef.current?.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-6 font-bold">// Contact</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-950 dark:text-white leading-[0.9]">
            LET'S <span className="italic opacity-50">CONNECT</span>.
          </h3>
          <p className="text-[var(--muted)] text-lg mb-12 max-w-md">
            Fill out the form or reach out directly via email.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] group-hover:border-accent transition-colors">
                <Mail size={20} className="text-accent" />
              </div>
              <span className="font-mono text-sm">{ME.email}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.form 
          ref={formRef}
          onSubmit={sendEmail}
          className="space-y-8 bg-[var(--card)] p-8 md:p-12 rounded-[3rem] border border-[var(--card-border)] shadow-[var(--shadow)]"
        >
          <div className="relative">
            <input required name="from_name" type="text" placeholder=" " className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)]" />
            <label className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">YOUR NAME</label>
          </div>

          <div className="relative">
            <input required name="from_email" type="email" placeholder=" " className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)]" />
            <label className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">EMAIL ADDRESS</label>
          </div>

          <div className="relative">
            <textarea required name="message" placeholder=" " rows={4} className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer resize-none text-[var(--foreground)]" />
            <label className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">MESSAGE</label>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-accent text-white rounded-2xl font-black tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : status === "success" ? "Sent!" : "Send Message"}
          </button>

          {status === "error" && <p className="text-red-500 text-xs font-mono text-center">Something went wrong. Please try again.</p>}
        </motion.form>
      </div>
    </section>
  );
}