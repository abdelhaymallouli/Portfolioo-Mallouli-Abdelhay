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
        return { status: "success", message: "Thanks — your message was sent. I'll reply soon." };
      } catch (error: any) {
        console.error("EmailJS Error:", error);
        return { status: "error", message: "Something went wrong. Please email me directly." };
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
            // Get in touch
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-[var(--foreground)] leading-[0.9]">
            Let&apos;s <span className="italic opacity-50">talk</span>.
          </h3>
          <p className="text-[var(--muted)] text-lg mb-12 max-w-md leading-relaxed">
            Whether it&apos;s a job, a freelance project, or just a question —
            send me a message or reach me directly.
          </p>

          <div className="space-y-4">
            <a href={`mailto:${ME.email}`} className="flex items-center gap-5 group w-fit">
              <div className="p-4 rounded-2xl glass border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <Mail size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Email</span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">{ME.email}</span>
              </div>
            </a>

            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group w-fit">
              <div className="p-4 rounded-2xl glass border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <Linkedin size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">LinkedIn</span>
                <span className="font-mono text-sm group-hover:text-accent transition-colors">/abdelhaymallouli</span>
              </div>
            </a>

            <a href={ME.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group w-fit">
              <div className="p-4 rounded-2xl glass border border-[var(--card-border)] group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                <Github size={22} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">GitHub</span>
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
          className="space-y-6 bg-[var(--card)] border border-[var(--card-border)] p-6 md:p-8 rounded-3xl shadow-sm h-fit"
        >
          <div>
            <label htmlFor="from_name" className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
              Your name
            </label>
            <input
              id="from_name" name="from_name" type="text" required placeholder="John Doe"
              className="w-full rounded-xl bg-[var(--background)] border border-[var(--card-border)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <label htmlFor="from_email" className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
              Email
            </label>
            <input
              id="from_email" name="from_email" type="email" required placeholder="you@email.com"
              className="w-full rounded-xl bg-[var(--background)] border border-[var(--card-border)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
              Message
            </label>
            <textarea
              id="message" name="message" rows={5} required
              placeholder="Tell me about your project, role, or question…"
              className="w-full rounded-xl bg-[var(--background)] border border-[var(--card-border)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 outline-none transition-all resize-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <button
            disabled={isPending} type="submit"
            className="w-full py-4 bg-accent text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:brightness-110 disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : state.status === "success" ? (
              <><Send size={16} /> Sent!</>
            ) : (
              <><Send size={16} /> Send message</>
            )}
          </button>

          {state.status === "error" && (
            <p className="text-red-500 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" /> {state.message}
            </p>
          )}
          {state.status === "success" && (
            <p className="text-emerald-500 text-sm flex items-center gap-2">
              <Send size={16} className="shrink-0" /> {state.message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}