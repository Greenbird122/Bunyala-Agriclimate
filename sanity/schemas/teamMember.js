// Sanity Schema for Team Members

export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
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
      title: 'name',
      subtitle: 'role',
      media: 'headshot',
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