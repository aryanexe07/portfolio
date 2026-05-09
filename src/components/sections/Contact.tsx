'use client';

import { useForm, ValidationError } from '@formspree/react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Loader2, Check } from 'lucide-react';
import { Github } from '@/components/ui/GithubIcon';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Contact() {
  // Replace with a real formspree ID in production
  const [state, handleSubmit] = useForm("xbjvkprl"); 
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate social icons
    const icons = sectionRef.current.querySelectorAll('.social-icon');
    gsap.fromTo(icons,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.06, ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="w-full max-w-[700px] mx-auto px-6 py-24 flex flex-col items-center text-center">
      <Badge className="mb-6">Currently available</Badge>
      
      <h2 className="font-fraunces font-medium text-[clamp(32px,4vw,48px)] text-[var(--accent-deep)] leading-[1.1] mb-4 transition-colors duration-300">
        Let&apos;s build something <br className="hidden sm:block" />
        <span className="italic text-[var(--accent)] font-light">exceptional.</span>
      </h2>
      
      <p className="text-[var(--text-muted)] text-[15px] font-light max-w-[400px] mx-auto mb-10 leading-relaxed transition-colors duration-300">
        Open to freelance work, collaborations, and ambitious ideas. Usually replies within 24 hours.
      </p>

      <Card className="w-full p-6 sm:p-10 mb-12 text-left relative overflow-hidden transition-all duration-300">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[12px] font-medium text-[var(--accent-deep)] uppercase tracking-wider pl-1">Name</label>
              <input 
                id="name" type="text" name="name" required
                className="w-full bg-[var(--bg-secondary)]/50 border border-[var(--card-border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--accent)] focus:bg-[var(--bg)] focus:ring-4 focus:ring-[var(--accent-glow)] magnetic custom-cursor-interact"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[12px] font-medium text-[var(--accent-deep)] uppercase tracking-wider pl-1">Email</label>
              <input 
                id="email" type="email" name="email" required
                className="w-full bg-[var(--bg-secondary)]/50 border border-[var(--card-border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--accent)] focus:bg-[var(--bg)] focus:ring-4 focus:ring-[var(--accent-glow)] magnetic custom-cursor-interact"
                placeholder="john@example.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-[12px] font-medium text-[var(--accent-deep)] uppercase tracking-wider pl-1">Message</label>
            <textarea 
              id="message" name="message" required rows={4}
              className="w-full bg-[var(--bg-secondary)]/50 border border-[var(--card-border)] rounded-[14px] px-4 py-3 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--accent)] focus:bg-[var(--bg)] focus:ring-4 focus:ring-[var(--accent-glow)] resize-none magnetic custom-cursor-interact"
              placeholder="Tell me about your project..."
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
          </div>

          <Button 
            type="submit" 
            disabled={state.submitting || state.succeeded} 
            className={`mt-2 w-full sm:w-auto self-end h-12 px-8 min-w-[140px] magnetic ${state.succeeded ? 'bg-[#34C478] hover:bg-[#34C478] shadow-[0_4px_16px_rgba(52,196,120,0.3)]' : 'bg-[var(--accent-deep)] hover:bg-[var(--accent)] shadow-[var(--btn-primary-shadow)]'}`}
          >
            {state.submitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : state.succeeded ? (
              <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Message Sent</span>
            ) : (
              "Send Message"
            )}
          </Button>

        </form>

        {/* Success Overlay */}
        <div className={`absolute inset-0 bg-[var(--card-bg)]/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-500 z-10 ${state.succeeded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-16 h-16 bg-[#34C478]/10 rounded-full flex items-center justify-center mb-4 text-[#34C478]">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="font-fraunces text-2xl text-[var(--accent-deep)] mb-2">Message Sent</h3>
          <p className="text-[var(--text-muted)] text-sm text-center max-w-[250px]">Thanks for reaching out! I&apos;ll get back to you as soon as possible.</p>
        </div>
      </Card>

      {/* Social Links */}
      <div className="flex gap-4 items-center">
        {[
          { icon: Github, url: "https://github.com/aryaniitian" },
          { icon: LinkedinIcon, url: "https://linkedin.com" },
          { icon: TwitterIcon, url: "https://twitter.com" },
          { icon: Mail, url: "mailto:hello@example.com" }
        ].map((social, i) => {
          const Icon = social.icon;
          return (
            <a 
              key={social.url} 
              href={social.url} 
              target="_blank" 
              rel="noreferrer"
              className="social-icon magnetic w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm flex items-center justify-center text-[var(--accent-deep)] shadow-[var(--card-shadow)] transition-all hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] hover:-translate-y-1 cursor-none"
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
