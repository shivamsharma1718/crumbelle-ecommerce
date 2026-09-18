import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const { t } = useTranslation('contact');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success(t('contact.successMsg', "Message sent successfully! We'll get back to you soon."));
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="bg-amber-50/50 min-h-screen py-16">
      <div className="container-main max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-choco-900)] mb-4">{t('contact.title', 'Say Hello!')}</h1>
          <p className="text-lg text-[var(--color-choco-600)]">
            {t('contact.subtitle', "Whether you have a question about our menu, need a custom wedding cake, or just want to chat about sourdough—we're all ears.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-[var(--shadow-card)] border border-amber-100 flex flex-col gap-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
               
               <div className="relative z-10 space-y-8">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-amber-100 rounded-full flex justify-center items-center text-amber-600 flex-shrink-0">
                        <FiMapPin size={22} />
                     </div>
                     <div>
                        <h3 className="font-bold text-[var(--color-choco-900)] mb-1">{t('contact.locationTitle', 'Our Bakery')}</h3>
                        <p className="text-sm text-[var(--color-choco-600)] leading-relaxed whitespace-pre-line">{t('contact.address', '42, Bakery Lane, \nColaba, Mumbai, \nMaharashtra 400001')}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-amber-100 rounded-full flex justify-center items-center text-amber-600 flex-shrink-0">
                        <FiPhone size={22} />
                     </div>
                     <div>
                        <h3 className="font-bold text-[var(--color-choco-900)] mb-1">{t('contact.phoneLabel', 'Phone Number')}</h3>
                        <a href="tel:+919876543210" className="text-sm text-amber-600 hover:text-amber-800 transition-colors font-medium">{t('contact.phone', '+91 98765 43210')}</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-amber-100 rounded-full flex justify-center items-center text-amber-600 flex-shrink-0">
                        <FiMail size={22} />
                     </div>
                     <div>
                        <h3 className="font-bold text-[var(--color-choco-900)] mb-1">{t('contact.emailLabel', 'Email Address')}</h3>
                        <a href={`mailto:${t('contact.email', 'hello@crumbelle.com')}`} className="text-sm text-amber-600 hover:text-amber-800 transition-colors font-medium">{t('contact.email', 'hello@crumbelle.com')}</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-amber-100/50">
                     <div className="w-12 h-12 bg-white border border-amber-200 rounded-full flex justify-center items-center text-[var(--color-choco-600)] flex-shrink-0">
                        <FiClock size={22} />
                     </div>
                     <div>
                        <h3 className="font-bold text-[var(--color-choco-900)] mb-1">{t('contact.hoursTitle', 'Opening Hours')}</h3>
                        <div className="text-sm text-[var(--color-choco-600)] space-y-1">
                           <p className="flex justify-between w-full gap-4"><span>{t('contact.hoursWeekdays', 'Mon - Sat: 08:00 AM - 09:00 PM')}</span></p>
                           <p className="flex justify-between w-full gap-4 font-bold text-amber-700"><span>{t('contact.hoursWeekend', 'Sunday: 09:00 AM - 02:00 PM')}</span></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 sm:p-10 rounded-3xl shadow-[var(--shadow-card)] border border-amber-100">
               <h2 className="font-display font-bold text-2xl text-[var(--color-choco-900)] mb-6">{t('contact.sendMessage', 'Send us a message')}</h2>
               
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('contact.nameLabel', 'Your Name')}</label>
                        <input type="text" required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)]" placeholder={t('contact.namePlaceholder', 'John Doe')} />
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('contact.emailLabel', 'Email Address')}</label>
                        <input type="email" required name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)]" placeholder={t('contact.emailPlaceholder', 'john@example.com')} />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('contact.subjectLabel', 'Subject')}</label>
                     <input type="text" required name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)]" placeholder={t('contact.subjectPlaceholder', 'How can we help you?')} />
                  </div>
                  <div>
                     <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('contact.messageLabel', 'Your Message')}</label>
                     <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] resize-none" placeholder={t('contact.messagePlaceholder', 'Write your message here...')} />
                  </div>
                  
                  <button type="submit" disabled={loading} className="w-full sm:w-auto px-10 py-4 bg-[var(--color-choco-900)] hover:bg-[#3d210f] text-white font-bold rounded-xl shadow-[var(--shadow-lg)] transition-all flex justify-center items-center">
                     {loading ? <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : t('contact.submitBtn', 'Send Message')}
                  </button>
               </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
