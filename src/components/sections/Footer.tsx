import { Github, Linkedin, Mail } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add form submission logic here
    setTimeout(() => {
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const contacts = [
    {
      icon: Mail,
      text: 'apurva.khangal24@spit.ac.in',
      link: 'mailto:apurva.khangal24@spit.ac.in',
      isEmail: true,
    },
    {
      icon: Linkedin,
      text: 'linkedin.com/in/apurvakhangal',
      link: 'https://www.linkedin.com/in/apurvakhangal/',
      isEmail: false,
    },
    {
      icon: Github,
      text: 'github.com/apurvakhangal',
      link: 'https://github.com/apurvakhangal',
      isEmail: false,
    },
    {
      icon: FaPinterest,
      text: 'pinterest.com/apurvaaa29',
      link: 'https://in.pinterest.com/apurvaaa29/',
      isEmail: false,
    },
  ];

  return (
    <footer id="contact" className="w-full py-12 pt-32 pb-10 border-t border-white/10 bg-black/20 backdrop-blur-xl relative z-10 scroll-mt-40 mb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-24">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* LEFT SIDE - Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
                Get In Touch
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Feel free to contact me for collaborations, opportunities, or suggestions.
              </p>
            </motion.div>

            {/* Contact Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={index}
                    href={contact.link}
                    target={contact.isEmail ? undefined : '_blank'}
                    rel={contact.isEmail ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-3 text-white/80 hover:text-blue-400 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.3, rotate: 10 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-base font-medium">{contact.text}</span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none transition-all duration-300 hover:border-white/20"
                  placeholder="Your name"
                  required
                  whileFocus={{ boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)' }}
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none transition-all duration-300 hover:border-white/20"
                  placeholder="your.email@example.com"
                  required
                  whileFocus={{ boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)' }}
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="form-input w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none transition-all duration-300 hover:border-white/20 resize-none"
                  placeholder="Your message..."
                  required
                  whileFocus={{ boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)' }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-400 font-medium hover:bg-blue-500/30 hover:border-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(96, 165, 250, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-white/50 text-sm">© 2026 Apurva Khangal. All rights reserved.</p>
          <motion.p
            className="text-white/50 text-sm font-mono"
            whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
            transition={{ duration: 0.3 }}
          >
            "Exploring the intersection of intelligence, creativity, and technology."
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}