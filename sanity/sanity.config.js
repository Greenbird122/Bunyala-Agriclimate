// Sanity Studio Configuration
// Run this with: npx sanity@latest init
// Or use: sanity start (after init)

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import article from './schemas/article';
import author from './schemas/author';
import teamMember from './schemas/teamMember';
import galleryImage from './schemas/galleryImage';

export default defineConfig({
  name: 'bunyala-news',
  title: 'Bunyala News & Stories',
  
  // Replace with your Sanity project ID and dataset
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '3r8wb2ev',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:5173',
        previewMode: '/preview/news',
      },
    }),
  ],

  schema: {
    types: [
      article,
      author,
      teamMember,
      galleryImage,
    ],
  },
});
