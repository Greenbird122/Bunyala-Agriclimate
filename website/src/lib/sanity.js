// Sanity Configuration
// Replace these values with your actual Sanity project credentials
// Get them from https://sanity.io/manage

const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use a recent API version
  useCdn: true, // `false` if you want to ensure fresh data
};

// Sanity client instance
// Uncomment after installing: npm install @sanity/client
/*
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
});
*/

// GROQ queries for fetching news articles
export const queries = {
  // Get all published articles
  allArticles: `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    category,
    "imageUrl": mainImage.asset->url,
    author->{
      name,
      image
    }
  }`,

  // Get a single article by slug
  articleBySlug: `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    category,
    "imageUrl": mainImage.asset->url,
    author->{
      name,
      image
    }
  }`,

  // Get latest articles (for preview)
  latestArticles: `*[_type == "article"] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    "imageUrl": mainImage.asset->url
  }`,
};

export default sanityConfig;
