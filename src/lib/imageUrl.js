// Sanity Image CDN URL helpers.
// Sanity's image CDN can resize and re-encode any asset on the fly:
//   ?w=800&q=75&fit=crop&auto=format  → resized, WebP/AVIF for supporting browsers
// Only CDN-hosted URLs are transformed; bundled static assets (Vite imports)
// are returned unchanged.

const CDN_HOST = 'cdn.sanity.io';

export function isSanityCdnUrl(url) {
  return typeof url === 'string' && url.includes(CDN_HOST);
}

export function sanityImageUrl(url, { width, height, quality = 75 } = {}) {
  if (!isSanityCdnUrl(url)) return url;

  const params = new URLSearchParams();
  if (width) params.set('w', String(width));
  if (height) params.set('h', String(height));
  if (width || height) params.set('fit', 'crop');
  params.set('q', String(quality));
  params.set('auto', 'format');
  return `${url}?${params.toString()}`;
}

export function sanityImageSrcSet(url, { widths = [400, 800, 1200], quality = 75 } = {}) {
  if (!isSanityCdnUrl(url)) return undefined;
  return widths.map((w) => `${sanityImageUrl(url, { width: w, quality })} ${w}w`).join(', ');
}

// Build a CDN URL directly from a raw Sanity asset reference
// (refs look like "image-<hash>-<width>x<height>-<ext>")
export function sanityRefToUrl(ref, projectId, dataset) {
  if (typeof ref !== 'string') return null;
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  const [, hash, dimensions, ext] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${dimensions}.${ext}`;
}
