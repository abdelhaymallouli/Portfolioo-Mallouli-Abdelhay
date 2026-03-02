"use client";
import { useActionState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  // Fix #12 — MapPin was imported but never used in JSX, removed
  Loader2,
  Github,
  Linkedin,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { ME } from "@/data/portfolio";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        return { status: "error", message: "Environment variables missing. Contact me directly via email." };
      }

      try {
        const templateParams = {
          from_name:  formData.get("from_name"),
          from_email: formData.get("from_email"),
          message:    formData.get("message"),
        };

        const result = await emailjs.send(serviceId, templateId, templateParams as Record<string, unknown>, publicKey);
        console.log("EmailJS Success:", result.text);
        if (formRef.current) formRef.current.reset();
        return { status: "success", message: "Message securely encrypted and sent!" };
      } catch (error: any) {
        console.error("EmailJS Error:", error);
        return { status: "error", message: "Transmission failed. Please try again." };
      }
    },
    { status: "idle", message: "" },
  );

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-[0.3em] mb-6 font-bold">
            // Secure Comms Channel
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-[var(--foreground)] leading-[0.9]">
            INITIATE <span className="italic opacity-50">CONTACT</span>.
          </h3>
          <p className="text-[var(--muted)] text-lg mb-12 max-w-md leading-relaxed">
            Interested in collaboration or just want to say hi? Reach out
            through the secure form or my professional channels.
          </p>

          <div className="space-y-4">
            <a href={`mailto:${ME.email}`} className="flex items-center gap-5 group w-fit">
              <div className="p-4 rounded-2xl glass border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <Mail size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Direct Email</span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">{ME.email}</span>
              </div>
            </a>

            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group w-fit">
              <div className="p-4 rounded-2xl glass border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <Linkedin size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">LinkedIn Network</span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">/abdelhaymallouli</span>
              </div>
            </a>

            <a href={ME.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group w-fit">
              <div className="p-4 rounded-2xl glass border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <Github size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">GitHub Archive</span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">/abdelhaymallouli</span>
              </div>
            </a>
          </div>
        </div>

        {/* Form */}
        <motion.form
          ref={formRef}
          action={formAction}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 glass p-8 md:p-12 rounded-[3rem] border-beam shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden h-fit"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative">
            <input required name="from_name" type="text" placeholder=" "
              className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)] font-mono" />
            <label className="absolute left-0 top-4 text-[var(--muted)] font-mono tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
              IDENTIFIER (NAME)
            </label>
          </div>

          <div className="relative">
            <input required name="from_email" type="email" placeholder=" "
              className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-accent transition-all peer text-[var(--foreground)] font-mono" />
            <label className="absolute left-0 top-4 text-[var(--muted)] font-mono tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
              RETURN ADDRESS (EMAIL)
            </label>
          </div>

          <div className="relative">
            <textarea required name="message" placeholder=" " rows={4}
              className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-accent transition-all peer resize-none text-[var(--foreground)] font-mono" />
            <label className="absolute left-0 top-4 text-[var(--muted)] font-mono tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
              ENCRYPTED MESSAGE
            </label>
          </div>

          <button
            disabled={isPending} type="submit"
            className="w-full py-5 bg-accent text-white rounded-2xl font-mono text-sm tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:brightness-110 disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : state.status === "success" ? (
              <span className="flex items-center gap-2"><Send size={16} /> TRANSMITTED</span>
            ) : (
              <span className="flex items-center gap-2"><Send size={16} /> INITIALIZE TRANSMISSION</span>
            )}
          </button>

          {state.status === "error" && (
            <p className="text-red-400 text-[10px] font-mono flex items-center justify-center gap-2 uppercase tracking-widest">
              <AlertCircle size={14} /> {state.message}
            </p>
          )}
          {state.status === "success" && (
            <p className="text-emerald-400 text-[10px] font-mono flex items-center justify-center gap-2 uppercase tracking-widest">
              <Send size={14} /> {state.message}
            </p>
          )}

          <div className="beam" />
        </motion.form>
      </div>
    </section>
  );
}