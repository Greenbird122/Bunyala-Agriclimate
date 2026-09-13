// Sanity Configuration
// Replace these values with your actual Sanity project credentials
// Get them from https://sanity.io/manage

import { createClient } from '@sanity/client';

const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '3r8wb2ev',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN || process.env.SANITY_TOKEN,
};

const createSanityClient = () => {
  const isDev = import.meta.env.DEV;
  const isBrowser = typeof window !== 'undefined';

  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: false,
    token: sanityConfig.token,
    useProjectHostname: !isDev,
    apiHost: isDev && isBrowser ? window.location.origin : 'https://api.sanity.io',
    requestHandler: isDev && isBrowser
      ? async (req, next) => {
          if (req.url && typeof req.url === 'string' && req.url.startsWith('http')) {
            const rewrittenUrl = req.url.replace(/^https?:\/\/[^/]+/, '');
            return next({ ...req, url: rewrittenUrl });
          }
          return next(req);
        }
      : undefined,
  });
};

export const sanityClient = createSanityClient();

// GROQ queries for fetching news articles
export const queries = {
  // Get all published articles (list payload: no body — it can be very large)
  allArticles: `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    "imageUrl": mainImage.asset->url,
    "mainImageRef": mainImage.asset._ref,
    author->{
      name,
      image
    }
  }`,

  // Get a single article by slug (full body; embedded image refs resolved to URLs)
  articleBySlug: `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    "imageUrl": mainImage.asset->url,
    "mainImageRef": mainImage.asset._ref,
    author->{
      name,
      image
    },
    "body": body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
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
    "imageUrl": mainImage.asset->url,
    "mainImageRef": mainImage.asset._ref
  }`,

  // Get all team members, ordered
  allTeamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    slug,
    role,
    "headshot": headshot.asset->url,
    credentials,
    linkedin,
    facebook,
    email,
    phone
  }`,

  // Get a single team member by slug
  teamMemberBySlug: `*[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    "headshot": headshot.asset->url,
    credentials,
    linkedin,
    facebook,
    email,
    phone
  }`,

  // NOTE: Docs created by migrate-images.cjs store the asset reference directly on
  // `image` (image._ref) instead of the canonical image object shape
  // (image.asset._ref), so `image.asset->` joins return null for those docs.
  // The coalesce + manual join below resolves BOTH shapes. Docs that still fail
  // to resolve (deleted assets) are filtered client-side.
  // Get all gallery images
  galleryImages: `*[_type == "galleryImage"] | order(order asc) {
    _id,
    image,
    "src": coalesce(image.asset->url, *[_id == ^.image._ref][0].url),
    alt,
    caption,
    category,
    order
  }`,

  // Get gallery images by category
  galleryImagesByCategory: `*[_type == "galleryImage" && category == $category] | order(order asc) {
    _id,
    image,
    "src": coalesce(image.asset->url, *[_id == ^.image._ref][0].url),
    alt,
    caption,
    category,
    order
  }`,
};

export default sanityConfig;