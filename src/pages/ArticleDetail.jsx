import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import { sanityClient, queries } from '../lib/sanity';
import { sanityImageUrl, sanityRefToUrl } from '../lib/imageUrl';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import newsHero from '../assets/images/shared/students-watering-tree.webp';

const SITE_URL = 'https://bunyala-agriclimate.org';

// Minimal Portable Text renderer — supports the blocks defined in the article
// schema (normal, h2, h3, blockquote, bullet/number lists, images).
function PortableText({ value }) {
  if (!Array.isArray(value)) return null;

  const renderChildren = (node) =>
    (node.children || [])
      .map((child) =>
        child.marks?.includes('strong') ? <strong key={child._key}>{child.text}</strong>
        : child.marks?.includes('em') ? <em key={child._key}>{child.text}</em>
        : child.text
      )
      .join('');

  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      const ListTag = currentList.type === 'number' ? 'ol' : 'ul';
      const listClass =
        currentList.type === 'number'
          ? 'list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300'
          : 'list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300';
      blocks.push(
        <ListTag key={`list-${blocks.length}`} className={listClass}>
          {currentList.items.map((item, i) => (
            <li key={i}>{renderChildren(item)}</li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  };

  value.forEach((node) => {
    switch (node._type) {
      case 'block': {
        if (node.listItem) {
          if (!currentList || currentList.type !== node.listItem) {
            flushList();
            currentList = { type: node.listItem, items: [] };
          }
          currentList.items.push(node);
          break;
        }
        flushList();
        const text = renderChildren(node);
        switch (node.style) {
          case 'h2':
            blocks.push(<h2 key={node._key} className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">{text}</h2>);
            break;
          case 'h3':
            blocks.push(<h3 key={node._key} className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">{text}</h3>);
            break;
          case 'blockquote':
            blocks.push(
              <blockquote key={node._key} className="border-l-4 border-accent pl-6 py-2 my-6 text-lg italic text-gray-600 dark:text-gray-400">
                {text}
              </blockquote>
            );
            break;
          default:
            blocks.push(<p key={node._key} className="text-[1.0625rem] text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{text}</p>);
        }
        break;
      }
      case 'image': {
        flushList();
        const src = node.url || sanityRefToUrl(node.asset?._ref, sanityClient?.config().projectId, sanityClient?.config().dataset);
        if (src) {
          blocks.push(
            <figure key={node._key} className="my-8">
              <img
                src={sanityImageUrl(src, { width: 1200, quality: 75 })}
                srcSet={`${sanityImageUrl(src, { width: 800, quality: 75 })} 800w, ${sanityImageUrl(src, { width: 1200, quality: 75 })} 1200w`}
                sizes="(max-width: 1024px) 100vw, 896px"
                alt={node.alt || ''}
                className="rounded-xl w-full"
                loading="lazy"
              />
              {node.caption && (
                <figcaption className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">{node.caption}</figcaption>
              )}
            </figure>
          );
        }
        break;
      }
      default:
        break;
    }
  });
  flushList();

  return <>{blocks}</>;
}

function estimateReadTime(body) {
  if (!Array.isArray(body)) return null;
  const words = body
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text).join(' '))
    .join(' ')
    .split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!sanityClient) {
        if (isMounted) setNotFound(true);
        return;
      }
      try {
        const data = await sanityClient.fetch(queries.articleBySlug, { slug });
        if (isMounted) {
          if (data) {
            setArticle(data);
          } else {
            setNotFound(true);
          }
        }
      } catch (err) {
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/news" replace />;
  }

  const mainImage =
    article.imageUrl ||
    sanityRefToUrl(article.mainImageRef, sanityClient?.config().projectId, sanityClient?.config().dataset);
  const readTime = estimateReadTime(article.body);
  const authorImage = article.author?.image
    ? sanityImageUrl(
        typeof article.author.image === 'string'
          ? article.author.image
          : article.author.image?.asset?.url || null,
        { width: 96, quality: 75 }
      )
    : null;

  return (
    <>
      <Helmet>
        <title>{`${article.title} | Bunyala Agri-Climate Industrial Park Limited`}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        {mainImage && <meta property="og:image" content={sanityImageUrl(mainImage, { width: 1200, quality: 75 })} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`${SITE_URL}/news/${article.slug.current}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            image: mainImage ? [sanityImageUrl(mainImage, { width: 1200, quality: 75 })] : undefined,
            author: article.author?.name ? [{ '@type': 'Person', name: article.author.name }] : undefined,
            publisher: {
              '@type': 'Organization',
              name: 'Bunyala Agri-Climate Industrial Park Limited',
            },
            mainEntityOfPage: `${SITE_URL}/news/${article.slug.current}`,
          })}
        </script>
      </Helmet>

      <main id="main-content">
        <Hero
          headline={article.title}
          subtitle={article.category}
          backgroundImage={mainImage || newsHero}
          height="large"
        />

        <article className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/news"
                className="inline-flex items-center text-primary dark:text-green-400 hover:underline mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>

              {/* Article meta */}
              <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-gray-200 dark:border-dark-border">
                {authorImage && (
                  <img
                    src={authorImage}
                    alt={article.author?.name || 'Author'}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  {article.author?.name && (
                    <p className="font-medium text-gray-900 dark:text-white">{article.author.name}</p>
                  )}
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    {readTime && (
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {readTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <PortableText value={article.body} />
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
