export default {
  name: "work",
  title: "Work",
  type: "document",
  fieldsets: [
    {
      title: "Section 2",
      name: "section_2",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Section 3",
      name: "section_3",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Section 4",
      name: "section_4",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Section 5",
      name: "section_5",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Section 6",
      name: "section_6",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Section 7",
      name: "section_7",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "campaign_name",
      title: "Campaign Name",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "city",
      title: "City",
      type: "string"
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true
          }
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },
    {
      name: 'section2Images',
      title: '',
      type: 'array',
      fieldset:'section_2',
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                  description: "Important for SEO",
                  options: {
                    isHighlighted: true
                  }
                }
              ],
              options: {
                hotspot: true
              }
            }
          ],
          
          preview: {
            select: {
              media: "image",
              title: "image.alt"
            }
          }
        }
      ]  
    },
    {
      name: 'section3Image',
      title: '',
      type: 'image',
      fieldset:'section_3',
    },

    {
      name: 'section4Image',
      title: '',
      type: 'image',
      fieldset:'section_4',
    },
    {
      name: 'section4Heading',
      title: 'Section 4 Heading',
      type: 'string',
      fieldset:'section_4',
    },
    {
      name: 'section4Description',
      title: 'Section 4 Description',
      type: 'blockContent',
      fieldset:'section_4',
    },
    {
      name: 'section5Image',
      title: '',
      type: 'image',
      fieldset:'section_5',
    },
    {
      name: 'section5Heading',
      title: 'Section 5 Heading',
      type: 'string',
      fieldset:'section_5',
    },
    {
      name: 'section5Description',
      title: 'Section 5 Description',
      type: 'blockContent',
      fieldset:'section_5',
    },
    {
      name: 'section6Images',
      title: '',
      type: 'array',
      fieldset:'section_6',
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                  description: "Important for SEO",
                  options: {
                    isHighlighted: true
                  }
                }
              ],
              options: {
                hotspot: true
              }
            }
          ],
          
          preview: {
            select: {
              media: "image",
              title: "image.alt"
            }
          }
        }
      ]  
    },
    {
      name: 'section6Heading',
      title: 'Section 6 Heading',
      type: 'string',
      fieldset:'section_6',
    },
    {
      name: 'section6Description',
      title: 'Section 6 Description',
      type: 'blockContent',
      fieldset:'section_6',
    },
    {
      name: 'section7videoImage',
      title: 'Video Poster',
      type: 'image',
      fieldset:'section_7',
    },
    {
      name: 'section7videoUrl',
      title: 'YouTube Video Url',
      type: 'string',
      fieldset:'section_7',
    },
    {
      name: 'section7Heading',
      title: 'Section 7 Heading',
      type: 'string',
      fieldset:'section_7',
    },
    {
      name: 'section7Description',
      title: 'Section 7 Description',
      type: 'blockContent',
      fieldset:'section_7',
    },
    {
      name: "services",
      type: "array",
      title: "Services",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "service",
              type: "string",
              title: "Service"
            },
            {
              name: "specialist",
              type: "string",
              title: "Specialist"
            },
          ],
          preview: {
            select: {
              title: "service",
            }
          }
        }
      ]
    },
    
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage"
    },
    prepare(selection) {
      return Object.assign({}, selection);
    }
  }
};
