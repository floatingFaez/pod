export default {
  name: "services",
  type: "document",
  title: "Service",
  fieldsets: [
    {
      title: "Tabs Content",
      name: "tabs_content",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Logos",
      name: "logos",
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
      name: "tabs",
      type: "array",
      title: "Tabs",
      fieldset:'tabs_content',
      description: "Enter Tab",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "tabImage",
              title: "Tab image",
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
              name: "tabtitle",
              type: "string",
              title: "Tab Title"
            },
            {
              name: "service_title",
              type: "string",
              title: "Service Title"
            },
            {
              name: "service_subtitle",
              type: "string",
              title: "Service Subtitle"
            },
            {
              name: "description",
              type: "text",
              title: "Descriptiont",
              rows:3,
            },
            {
              name: "serviceOptions",
              type: "array",
              title: "Service Options",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "service1",
                      type: "string",
                      title: "Service 1"
                    },
                    {
                      name: "service2",
                      type: "string",
                      title: "Service 2"
                    },
                  ],
                  preview: {
                    select: {
                      title: "service1",
                    }
                  }
                }
              ]
            },
          ],
          preview: {
            select: {
              title: "tabtitle",
              media: "tabImage"
            }
          }
        }
      ]
    },
    {
      name: "sectiontitle",
      type: "string",
      title: "Section Title",
      fieldset:'logos'
    },
    // {
    //   name: "client",
    //   type: "array",
    //   title: "Clients",
    //   fieldset:'logos',
    //   of: [
    //     {
    //       type: "object",
    //       fields: [
    //         {
    //           name: "logo_img",
    //           title: "Logo image",
    //           type: "image",
    //           fields: [
    //             {
    //               name: "alt",
    //               type: "string",
    //               title: "Alternative text",
    //               description: "Important for SEO and accessiblity.",
    //               options: {
    //                 isHighlighted: true
    //               }
    //             }
    //           ],
    //           options: {
    //             hotspot: true
    //           }
    //         },,
    //         {
    //           name: "logo_name",
    //           type: "string",
    //           title: "Logo Name"
    //         },
    //       ],
    //       preview: {
    //         select: {
    //           title: "logo_name",
    //           media: "logo_img"
    //         }
    //       }
    //     }
    //   ]
    // }

  ],
};
