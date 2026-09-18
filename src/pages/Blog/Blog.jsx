import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiClock, FiArrowRight } from 'react-icons/fi';

export const BLOG_POSTS = [
  {
    slug: 'science-of-sourdough',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&max-h=500&fit=crop',
    date: 'Oct 12, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'perfect-croissant-guide',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&max-h=500&fit=crop',
    date: 'Sep 28, 2026',
    readTime: '4 min read',
  },
  {
    slug: 'eggless-baking-tips',
    image: 'https://images.unsplash.com/photo-1558303695-3e926c2e0f11?w=800&max-h=500&fit=crop',
    date: 'Sep 15, 2026',
    readTime: '6 min read',
  }
];

export default function Blog() {
  const { t } = useTranslation('blog');

  return (
    <div className="bg-amber-50/30 min-h-screen py-16">
      <div className="container-main max-w-6xl">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-choco-900)] mb-4">
            {t('blog.title', 'The Crumbelle Journal')}
          </h1>
          <p className="text-lg text-[var(--color-choco-600)]">
            {t('blog.subtitle', 'Stories, recipes, and baking secrets straight from our kitchen to yours.')}
          </p>
        </div>

        <div className="grid gap-10">
          {BLOG_POSTS.map((post, i) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[var(--shadow-card)] border border-amber-100 transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`} className="md:w-2/5 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={t(`blog.posts.${post.slug}.title`)}
                  className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                   <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                     {t(`blog.posts.${post.slug}.category`)}
                   </span>
                </div>
              </Link>
              
              <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                <div className="flex items-center gap-4 text-sm text-[var(--color-choco-500)] mb-4">
                  <span className="font-medium">{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-300" />
                  <span className="flex items-center gap-1.5"><FiClock size={14} /> {post.readTime}</span>
                </div>
                
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-choco-900)] mb-4 group-hover:text-amber-600 transition-colors leading-tight">
                    {t(`blog.posts.${post.slug}.title`)}
                  </h2>
                </Link>
                
                <p className="text-[var(--color-choco-600)] leading-relaxed mb-6 line-clamp-3">
                  {t(`blog.posts.${post.slug}.excerpt`)}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 font-bold text-amber-600 hover:text-amber-700 transition-colors mt-auto self-start"
                >
                  {t('blog.readArticle', 'Read Article')} <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
           <button className="px-8 py-3.5 bg-white border-2 border-amber-200 text-amber-800 font-bold rounded-xl hover:bg-amber-50 hover:border-amber-400 transition-all">
             {t('blog.loadMore', 'Load More Articles')}
           </button>
        </div>

      </div>
    </div>
  );
}
