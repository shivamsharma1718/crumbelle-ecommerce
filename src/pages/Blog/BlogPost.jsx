import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';
import { BLOG_POSTS } from './Blog';

export default function BlogPost() {
  const { t } = useTranslation('blog');
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container-main py-32 text-center min-h-[60vh] flex flex-col justify-center">
        <h1 className="font-display text-4xl font-bold text-[var(--color-choco-900)] mb-4">{t('blog.notFoundTitle', 'Article Not Found')}</h1>
        <p className="text-[var(--color-choco-600)] mb-8">{t('blog.notFoundDesc', "The story you're looking for doesn't exist.")}</p>
        <Link to="/blog" className="text-amber-600 font-bold hover:text-amber-800 transition-colors inline-flex items-center gap-2 justify-center">
          <FiArrowLeft /> {t('blog.backToJournal', 'Back to Journal')}
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-amber-50/20 py-12 lg:py-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto">
        
        {/* Header content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-800 transition-colors mb-6 group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> {t('blog.backToJournal', 'Back to Journal')}
          </Link>
          
          <div className="flex justify-center items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-4">
             <span className="bg-amber-100 px-3 py-1 rounded-full">{t(`blog.posts.${post.slug}.category`)}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--color-choco-900)] leading-[1.1] mb-6 max-w-3xl mx-auto">
             {t(`blog.posts.${post.slug}.title`)}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-[var(--color-choco-500)]">
             <span className="flex items-center gap-1.5"><FiCalendar size={14} /> {post.date}</span>
             <span className="w-1 h-1 rounded-full bg-amber-300" />
             <span className="flex items-center gap-1.5"><FiClock size={14} /> {post.readTime}</span>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="rounded-[2.5rem] overflow-hidden shadow-[var(--shadow-card)] border-8 border-white mb-16 aspect-[16/9] bg-amber-100 relative group">
           <img src={post.image} alt={t(`blog.posts.${post.slug}.title`)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        </motion.div>

        {/* Body content */}
        <div className="prose prose-lg prose-amber mx-auto prose-headings:font-display prose-headings:text-[var(--color-choco-900)] prose-p:text-[var(--color-choco-700)] prose-a:text-amber-600">
           <p className="text-xl sm:text-2xl font-display text-[var(--color-choco-800)] leading-relaxed mb-8 italic">
             {t(`blog.posts.${post.slug}.excerpt`)}
           </p>

           <h2>{t('blog.bodyH2', 'The Beginning of the Process')}</h2>
           <p>{t('blog.bodyP1', "Creating artisan bakery items requires more than just mixing ingredients. It is a slow, methodical process that demands respect for temperature, hydration, and time. When we speak about our signature sourdough, we're actually talking about a living ecosystem of wild yeast and lactic acid bacteria.")}</p>
           
           <h3>{t('blog.bodyH3', 'Why 48 Hours?')}</h3>
           <p>{t('blog.bodyP2', 'Most commercial bread is made from start to finish in under three hours using commercial yeast. This rapid process produces a loaf quickly, but leaves much to be desired in terms of flavor and digestibility. By slowing down the fermentation process through cold proofing, we achieve three critical things:')}</p>
           <ul>
             <li><strong>{t('blog.li1', 'Deep flavor development: The bacteria have time to produce organic acids (lactic and acetic acid) which give the bread its characteristic tang.')}</strong></li>
             <li><strong>{t('blog.li2', 'Better structure: The extended time allows the gluten network to develop naturally and align, resulting in a perfectly chewy crumb.')}</strong></li>
             <li><strong>{t('blog.li3', 'Easier digestion: The long fermentation begins the breakdown of complex carbohydrates and neutralize phytic acid.')}</strong></li>
           </ul>

           <blockquote>
             "{t('blog.quote', "Good bread doesn't happen by accident. It happens through patience.")}"
           </blockquote>

           <p>{t('blog.bodyP3', "We invite you to taste the difference. Next time you pick up a loaf from our store, take a moment to smell the complex aroma before your first bite. We promise it's worth the wait.")}</p>
        </div>

      </div>
    </article>
  );
}
