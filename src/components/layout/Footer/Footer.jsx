import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight, FiShield, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const SOCIALS = [
  { icon: <FiInstagram size={18} />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <FiTwitter size={18} />,   label: 'Twitter',   href: 'https://twitter.com' },
  { icon: <FiFacebook size={18} />,  label: 'Facebook',  href: 'https://facebook.com' },
  { icon: <FiYoutube size={18} />,   label: 'YouTube',   href: 'https://youtube.com' },
];

export default function Footer() {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');

  const LINKS = {
    'Quick Links': [
      { label: t('nav.home'), to: '/' },
      { label: t('nav.shop'), to: '/shop' },
      { label: t('nav.about'), to: '/about' },
      { label: t('nav.blog'), to: '/blog' },
      { label: t('nav.contact'), to: '/contact' },
    ],
    'Collection': [
      { label: t('nav.cat_cakes'), to: '/shop/cakes' },
      { label: t('nav.cat_breads'), to: '/shop/breads' },
      { label: t('nav.cat_pastries'), to: '/shop/pastries' },
      { label: t('nav.cat_cookies'), to: '/shop/cookies' },
      { label: t('nav.cat_muffins'), to: '/shop/muffins' },
    ],
    'Assistance': [
      { label: t('footer.faq', 'FAQ Information'), to: '/contact' },
      { label: t('footer.refundPolicy', 'Refund Promise'), to: '/contact' },
      { label: t('footer.shippingInfo', 'Delivery Logics'), to: '/contact' },
      { label: t('footer.privacyPolicy', 'Data Protection'), to: '/contact' },
      { label: t('footer.termsOfService', 'Service Terms'), to: '/contact' },
    ],
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success(t('newsletter.success', "Welcome to the inner circle! 🧁"));
      setEmail('');
    }
  };

  return (
    <footer className="bg-[var(--color-choco-900)] text-amber-100/60 font-accent">
      
      {/* Newsletter Strip - Premium */}
      <div className="bg-amber-500 py-12">
        <div className="container-main flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <h3 className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight mb-2">Join the Inner Circle</h3>
            <p className="text-amber-900/60 font-black text-[10px] uppercase tracking-widest">Receive weekly artisanal secrets & early access</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl group">
            <div className="relative flex-1 group">
               <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-900/40 group-focus-within:text-amber-900 transition-colors" size={20} />
               <input
                 type="email"
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 placeholder="Enter your refined email..."
                 required
                 className="w-full pl-14 pr-8 h-16 bg-white/20 border-2 border-white/10 rounded-[1.25rem] text-amber-900 placeholder-amber-900/40 text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-white transition-all shadow-inner"
               />
            </div>
            <button
              type="submit"
              className="h-16 px-10 bg-[var(--color-choco-900)] text-white font-black text-[11px] uppercase tracking-[0.25em] rounded-[1.25rem] hover:bg-amber-900 hover:shadow-xl active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              Subscribe <FiSend size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="container-main pt-24 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-12">

          {/* Brand Vision */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-white/5 group-hover:rotate-6 transition-transform">
                🧁
              </div>
              <div>
                <p className="font-display font-black text-3xl text-white tracking-tighter leading-none">{t('brand.name')} {t('brand.bakery')}</p>
                <p className="font-black text-[9px] uppercase tracking-[0.3em] text-amber-500/80 mt-1">{t('brand.tagline')}</p>
              </div>
            </Link>
            
            <p className="text-[11px] font-black uppercase tracking-widest leading-loose text-white/40 max-w-xs">
              {t('footer.description', 'Artisan breads, celebration cakes & pastries made fresh every day with only the finest ingredients. Delivering happiness to your door since 2019.')}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 shrink-0">
                  <FiMapPin size={16} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-tight leading-relaxed pt-1">
                  42, Bakery Lane, <br /> Colaba, Mumbai 400001
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 shrink-0">
                   <FiPhone size={16} />
                </div>
                <p className="text-[11px] font-black tracking-widest">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Enhanced Link Columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-10">
              <h4 className="font-display font-black text-white text-xs uppercase tracking-[0.3em] pl-1 relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-amber-500 rounded-full" />
                {heading === 'Quick Links' ? t('footer.quickLinks', 'Nav') : heading === 'Collection' ? t('nav.collection', 'Menu') : t('footer.support', 'Support')}
              </h4>
              <ul className="space-y-5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[10px] font-black uppercase tracking-widest hover:text-amber-400 transition-all flex items-center gap-3 group"
                    >
                      <span className="w-1.5 h-1.5 border border-amber-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials Connection */}
          <div className="space-y-10">
              <h4 className="font-display font-black text-white text-xs uppercase tracking-[0.3em] pl-1 relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-amber-500 rounded-full" />
                Socials
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-amber-100 hover:bg-amber-500 hover:text-white hover:-translate-y-1 transition-all shadow-lg active:scale-90"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-default">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-2 mb-2">
                    <FiShield size={14} /> Certified Secure
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-tight text-white/30 leading-relaxed">
                    Every transaction is protected by enterprise-grade encryption.
                  </p>
              </div>
          </div>
        </div>

        {/* Bottom Refinement */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              {t('footer.rights', '© {{year}} Crumbelle. Hand-Coded Excellence.', { year: new Date().getFullYear() })}
           </div>
           
           <div className="flex items-center gap-6">
              {[ 'Mastercard', 'Visa', 'UPI', 'Google Pay' ].map(p => (
                <span key={p} className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-amber-500/40 cursor-default transition-all">
                  {p}
                </span>
              ))}
           </div>

           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
             MADE IN MUMBAI WITH LOVE 🧁
           </div>
        </div>
      </div>
    </footer>
  );
}

