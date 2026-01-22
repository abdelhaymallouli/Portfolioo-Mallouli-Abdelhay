"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Loader2, Github, Linkedin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { ME } from "@/data/portfolio";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey,
      );
      setStatus("success");
      formRef.current?.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info (Left Side) */}
        <div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-6 font-bold">
            // Contact
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-[var(--foreground)] leading-[0.9]">
            LET'S <span className="italic opacity-50">CONNECT</span>.
          </h3>
          <p className="text-[var(--muted)] text-lg mb-12 max-w-md leading-relaxed">
            Interested in collaboration or just want to say hi? Reach out
            through the form or my social channels.
          </p>

          <div className="space-y-4">
            {/* Email Link */}
            <a
              href={`mailto:${ME.email}`}
              className="flex items-center gap-5 group w-fit"
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                <Mail size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
                  Email Me
                </span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">
                  {ME.email}
                </span>
              </div>
            </a>

            {/* LinkedIn Link */}
            <a
              href={ME.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 group w-fit"
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                <Linkedin size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
                  LinkedIn
                </span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">
                  /abdelhaymallouli
                </span>
              </div>
            </a>

            {/* GitHub Link */}
            <a
              href={ME.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 group w-fit"
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                <Github size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
                  GitHub
                </span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">
                  /abdelhaymallouli
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Form (Right Side) */}
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 bg-[var(--card)] p-8 md:p-12 rounded-[3rem] border border-[var(--card-border)] shadow-xl relative overflow-hidden"
        >
          {/* Subtle Decorative Gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />

          <div className="relative">
            <input
              required
              name="from_name"
              type="text"
              placeholder=" "
              className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)]"
            />
            <label className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              YOUR NAME
            </label>
          </div>

          <div className="relative">
            <input
              required
              name="from_email"
              type="email"
              placeholder=" "
              className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)]"
            />
            <label className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              EMAIL ADDRESS
            </label>
          </div>

          <div className="relative">
            <textarea
              required
              name="message"
              placeholder=" "
              rows={4}
              className="w-full bg-transparent border-b-2 border-[var(--card-border)] py-4 outline-none focus:border-accent transition-all peer resize-none text-[var(--foreground)]"
            />
            <label className="absolute left-0 top-4 text-[var(--muted)] transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
              MESSAGE
            </label>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-accent text-white rounded-2xl font-black tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-lg hover:brightness-110 disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : status === "success" ? (
              "Message Sent!"
            ) : (
              "Send Message"
            )}
          </button>

          {status === "error" && (
            <p className="text-red-500 text-[10px] font-mono text-center uppercase tracking-widest">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
