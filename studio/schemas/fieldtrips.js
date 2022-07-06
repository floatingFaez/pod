export default {
  name: "fieldtrips",
  type: "document",
  title: "Field Trips",
  fieldsets: [
    {
      title: "Bespoke Package",
      name: "bes_packages",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Custom Package",
      name: "packages",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "subtitle",
      type: "string",
      title: "Sub Title"
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
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 2,
      validation: Rule => Rule.max(200)
    },
    {
      name: "body",
      description:"The texts is used in page content",
      title: "Description",
      type: "text",
      rows:4,
    },

    {
      name: "bep_sectiontitle",
      type: "string",
      title: "Section Title",
      fieldset:'bes_packages'
    },

    {
      name: "bep_section_subtitle",
      type: "string",
      title: "Section Sub Title",
      fieldset:'bes_packages'
    },

    {
      name: "sectiontitle",
      type: "string",
      title: "Section Title",
      fieldset:'packages'
    },
    {
      name: "tabs",
      type: "array",
      title: "Bespoke Packages",
      fieldset:'bes_packages',
      description: "Enter Bespoke Packages",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "tabtitle",
              type: "string",
              title: "Tab Title"
            },
            {
              name: "packag_title",
              type: "string",
              title: "Package Title"
            },
            {
              name: "description",
              type: "text",
              title: "Descriptiont",
              rows:3,
            },
            {
              name: "packageOptions",
              type: "array",
              title: "Packages Options",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "name",
                      type: "string",
                      title: "Name"
                    },
                  ],
                  preview: {
                    select: {
                      title: "name",
                    }
                  }
                }
              ]
            },
          ],
          preview: {
            select: {
              title: "tabtitle",
            }
          }
        }
      ]
    },
    {
      name: "package",
      type: "array",
      title: "Packages",
      fieldset:'packages',
      description: "Enter Packages",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title"
            },
            {
              name: "description",
              type: "text",
              title: "Descriptiont",
              rows:3,
            },
            {
              name: "pkgImage",
              title: "Package image",
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
              type: "string",
              name: "buttonText",
              title: "Button Text"
            },
            {
              type: "string",
              name: "buttonUrl",
              title: "Button Url"
            }
          ],
          preview: {
            select: {
              title: "title",
              media: "pkgImage"
            }
          }
        }
      ]
    },

  ],
};
