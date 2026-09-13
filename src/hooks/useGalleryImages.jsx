import { useState, useEffect } from 'react';
import { sanityClient, queries } from '../lib/sanity';
import {
  facilityImages,
  eventImages,
  impactGalleryImages,
  aboutGalleryImages,
} from '../data/gallery';

const staticGalleries = {
  solutions: facilityImages,
  events: eventImages,
  impact: impactGalleryImages,
  about: aboutGalleryImages,
  home: [...aboutGalleryImages.slice(0, 3), ...impactGalleryImages.slice(0, 3)],
  all: [...facilityImages, ...eventImages, ...impactGalleryImages, ...aboutGalleryImages],
};

// Pick the strongest available image URL from a Sanity gallery doc.
// Legacy docs store the ref directly on `image` (image._ref), which breaks
// server-side joins, so we fall back to building the CDN URL from the ref.
function resolveImageUrl(doc) {
  if (doc.src) return doc.src;
  const ref = doc.image?._ref || doc.image?.asset?._ref;
  // Refs look like "image-<hash>-<width>x<height>-<ext>"
  const match = typeof ref === 'string' ? ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/) : null;
  if (!match) return null;
  const [, hash, dimensions, ext] = match;
  return `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${
    sanityClient.config().dataset
  }/${hash}-${dimensions}.${ext === 'jpg' ? 'jpg' : ext}`;
}

// The dataset contains duplicates (the migration script was re-run) and docs
// whose asset no longer resolves. Both would render as broken images.
function normalizeImages(docs) {
  if (!Array.isArray(docs)) return [];
  const seen = new Set();
  const result = [];
  for (const doc of docs) {
    const src = resolveImageUrl(doc);
    if (!src || seen.has(src)) continue;
    seen.add(src);
    result.push({ ...doc, src });
  }
  return result;
}

export function useGalleryImages(category) {
  const fallback = staticGalleries[category] || staticGalleries.home || [];
  const [images, setImages] = useState(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!sanityClient) return;

      try {
        const isAll = category === 'all';
        const data = await sanityClient.fetch(
          isAll ? queries.galleryImages : queries.galleryImagesByCategory,
          isAll ? {} : { category: category || '' }
        );
        if (isMounted) {
          const normalized = normalizeImages(data);
          if (normalized.length > 0) {
            setImages(normalized);
          } else {
            setImages(fallback);
          }
        }
      } catch (err) {
        // Silently fall back to bundled static assets without throwing uncaught UI errors
        if (isMounted) {
          setImages(fallback);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { images, loading };
}

export default useGalleryImages;
