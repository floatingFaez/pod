export default {
  name: "page",
  type: "document",
  title: "Page",
  // __experimental_actions: [
  //   /* "create", "delete", */ "update",
  //   "publish"
  // ],
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
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: "body",
      description:"The texts is used in page content",
      title: "Description",
      type: "text"
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
              title: "Descriptiont"
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
