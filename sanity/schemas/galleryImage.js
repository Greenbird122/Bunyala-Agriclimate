// Sanity Schema for Gallery Images
// These docs power the image galleries on Home, About, Solutions, Impact, and News.
// The image field uses Sanity's canonical shape (image.asset reference) so
// `image.asset->url` joins work in GROQ.

export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Solutions / Facility', value: 'solutions' },
          { title: 'Events', value: 'events' },
          { title: 'Impact', value: 'impact' },
          { title: 'About', value: 'about' },
          { title: 'Home', value: 'home' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Order, Low to High',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
