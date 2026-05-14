import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    }, 1000);
  };

  const socials = [
    { icon: Mail,      label: 'Email',     text: 'apurva.khangal24@spit.ac.in',        link: 'mailto:apurva.khangal24@spit.ac.in', accent: 'group-hover:text-blue-300  group-hover:border-blue-400/30' },
    { icon: Linkedin,  label: 'LinkedIn',  text: 'linkedin.com/in/apurvakhangal',       link: 'https://www.linkedin.com/in/apurvakhangal/', accent: 'group-hover:text-blue-400  group-hover:border-blue-400/30' },
    { icon: Github,    label: 'GitHub',    text: 'github.com/apurvakhangal',            link: 'https://github.com/apurvakhangal', accent: 'group-hover:text-white    group-hover:border-white/20' },
    { icon: FaPinterest, label: 'Pinterest', text: 'pinterest.com/apurvaaa29',          link: 'https://in.pinterest.com/apurvaaa29/', accent: 'group-hover:text-red-400   group-hover:border-red-400/30' },
    { icon: MapPin,    label: 'Location',  text: 'Mumbai, India',                       link: '#', accent: 'group-hover:text-emerald-400 group-hover:border-emerald-400/30' },
  ];

  return (
    <footer id="contact" className="relative w-full pt-16 pb-8 border-t border-white/8 bg-black/20 backdrop-blur-xl z-10 scroll-mt-40 overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-24 relative z-10">

        {/* Header row */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400/50 mb-2">// Contact</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
            Let's build something{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">remarkable.</span>
          </h2>
          <p className="text-white/45 text-sm mt-2 max-w-lg">
            Open to collaborations, opportunities, and interesting conversations.
          </p>
        </motion.div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10">

          {/* LEFT — Social links */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.link}
                  target={s.link.startsWith('mailto') || s.link === '#' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-all duration-300 ${s.accent}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  whileHover={{ x: 4 }}
                >
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-current transition-colors flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/60 truncate">{s.text}</p>
                  </div>
                  <span className="text-white/20 group-hover:text-white/50 text-sm transition-colors">↗</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="f-name" className="block text-xs font-mono text-white/35 mb-1.5 uppercase tracking-widest">Name</label>
                  <input
                    id="f-name" name="name" type="text" required
                    value={formData.name} onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/25 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/15 transition-all hover:border-white/15"
                  />
                </div>
                <div>
                  <label htmlFor="f-email" className="block text-xs font-mono text-white/35 mb-1.5 uppercase tracking-widest">Email</label>
                  <input
                    id="f-email" name="email" type="email" required
                    value={formData.email} onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/25 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/15 transition-all hover:border-white/15"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="f-message" className="block text-xs font-mono text-white/35 mb-1.5 uppercase tracking-widest">Message</label>
                <textarea
                  id="f-message" name="message" rows={4} required
                  value={formData.message} onChange={handleInputChange}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/25 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/15 transition-all hover:border-white/15 resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading || sent}
                className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60"
                style={{
                  background: sent
                    ? 'linear-gradient(135deg,#059669,#047857)'
                    : 'linear-gradient(135deg,rgba(59,130,246,0.65),rgba(139,92,246,0.65))',
                  boxShadow: '0 0 20px rgba(96,165,250,0.15)',
                }}
                whileHover={{ scale: 1.01, boxShadow: '0 0 24px rgba(96,165,250,0.3)' }}
                whileTap={{ scale: 0.99 }}
              >
                {sent ? '✓ Sent!' : loading ? 'Sending...' : 'Send Message →'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent mb-5" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono text-white/25">
            <p>© 2026 Apurva Khangal. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to opportunities</span>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}