export default {
  name: "siteconfig",
  type: "document",
  title: "Site Settings",
  __experimental_actions: [
    /* "create", "delete", */ "update",
    "publish"
  ],
  fieldsets: [
    {
      title: "SEO & metadata",
      name: "metadata",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Social Media",
      name: "social"
    },
    {
      title: "Website Logo",
      name: "logos",
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site title"
    },
    {
      name: "slogan",
      type: "string",
      title: "Site Slogan"
    },
    {
      name: "location",
      type: "string",
      title: "Geo Location"
    },
    {
      name: "logotext",
      type: "string",
      title: "Logo Text"
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      description: "The main site url. Used to create canonical url"
    },
    {
      name: "copyright",
      type: "string",
      title: "Copyright Name",
      description: "Enter company name to appear in footer after ©"
    },

    {
      title: "Main logo",
      description: "Upload your main logo here. SVG preferred. ",
      name: "logo",
      type: "image",
      fieldset: "logos",
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
      ]
    },

    {
      title: "Footer logo",
      description: "Upload your footer logo here. SVG preferred. ",
      name: "footerlogo",
      type: "image",
      fieldset: "logos",
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
      ]
    },

    {
      title: "Alternate logo (optional)",
      description:
        "Upload alternate logo here. it can be light / dark variation ",
      name: "logoalt",
      type: "image",
      fieldset: "logos",
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
      ]
    },

    // {
    //   name: "email",
    //   type: "string",
    //   title: "Support Email",
    //   validation: Rule =>
    //     Rule.regex(
    //       /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    //       {
    //         name: "email", // Error message is "Does not match email-pattern"
    //         invert: false // Boolean to allow any value that does NOT match pattern
    //       }
    //     )
    // },

    {
      name: "marquee_text",
      type: "string",
      title: "Marquee Scroll Text"
    },
    {
      name: "marquee_tape_text",
      type: "string",
      title: "Marquee Tape Scroll Text",
      description:"Border of Outside Box Tape Design Scrolling Text"
    },
    {
      name: "w3ckey",
      type: "string",
      title: "Web3Forms Access Key",
      description:
        "Enter Access key obtained from web3forms.com. It is required to make the form work."
    },
    {
      name: 'menus',
      title: 'Main Menu',
      type: 'array',
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "name",
              title: "Name"
            },
            {
              type: "string",
              name: "link",
              title: "Link"
            }
          ],
          preview: {
            select: {
              title: "name"
            }
          }
        }
      ]
    },
    {
      name: 'footer_menus',
      title: 'Footer Menu',
      type: 'array',
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "name",
              title: "Name"
            },
            {
              type: "string",
              name: "link",
              title: "Link"
            },
            {
              type: "string",
              name: "target",
              title: "Target",
              options: {
                list: [
                  { title: "New Tab", value: "_tab" },
                  { title: "Self", value: "_self" },
                ],
              }
            },
          ],
          preview: {
            select: {
              title: "name"
            }
          }
        }
      ]
    },
    {
      name: "social",
      type: "array",
      title: "Social Links",
      description: "Enter your Social Media URLs",
      validation: Rule => Rule.unique(),
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "media",
              title: "Choose Social Media",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Linkedin", value: "linkedin" },
                  { title: "Youtube", value: "youtube" }
                ]
              }
            },
            {
              type: "url",
              name: "url",
              title: "Full Profile URL"
            }
          ],
          preview: {
            select: {
              title: "media",
              subtitle: "url"
            }
          }
        }
      ]
    },

    {
      title: "Meta Description",
      name: "description",
      fieldset: "metadata",
      type: "text",
      rows: 5,
      validation: Rule => Rule.min(20).max(200),
      description: "Enter SEO Meta Description"
    },

    {
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      description:
        "Image for sharing previews on Facebook, Twitter etc.",
      fieldset: "metadata"
    }
  ]
};
