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
      title: "Ticker",
      name: "ticker"
    },
    {
      title: "Website Logo",
      name: "logos",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Footer",
      name: "footers",
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
      title: "Site title"
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
      name: 'cta',
      title: 'CTA Desktop',
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
              name: 'submenu',
              title: 'Submenu',
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
      name: 'cta_mobile',
      title: 'CTA Mobile',
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
              name: 'submenu',
              title: 'Submenu',
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
                      title: "Link Target"
                    },
                  ],
                  preview: {
                    select: {
                      title: "name"
                    }
                  },
                  initialValue: {
                    target: '_self',
                  },
                }
              ]
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
    // {
    //   title: "Alternate logo (optional)",
    //   description:
    //     "Upload alternate logo here. it can be light / dark variation ",
    //   name: "logoalt",
    //   type: "image",
    //   fieldset: "logos",
    //   fields: [
    //     {
    //       name: "alt",
    //       type: "string",
    //       title: "Alternative text",
    //       description: "Important for SEO and accessiblity.",
    //       options: {
    //         isHighlighted: true
    //       }
    //     }
    //   ]
    // },

    {
      title: "Footer logo",
      description: "Upload your footer logo here. SVG preferred. ",
      name: "footerlogo",
      type: "image",
      fieldset: "footers",
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
      name: "slogan",
      type: "string",
      title: "Site Tagline",
      fieldset: "footers",
    },
    {
      name: "location",
      type: "string",
      title: "Geo Location",
      fieldset: "footers",
    },
    {
      name: "copyright",
      type: "string",
      title: "Copyright Name",
      fieldset: "footers",
      description: "Enter company name to appear in footer after ©"
    },
    {
      name: 'footer_menus',
      title: 'Footer Menu',
      fieldset: "footers",
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
      title: "Ticker Text",
      fieldset: "ticker"
    },
    {
      name: "marquee_tape_text",
      type: "string",
      title: "Ticker Tape Text",
      fieldset: "ticker",
      description:"Border of Outside Box Tape Design Scrolling Text"
    },
    {
      name: "marquee_speed",
      type: "number",
      title: "Ticker Speed",
      fieldset: "ticker",
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
    },
    // {
    //   name: "social",
    //   type: "array",
    //   title: "Social Links",
    //   description: "Enter your Social Media URLs",
    //   validation: Rule => Rule.unique(),
    //   of: [
    //     {
    //       type: "object",
    //       fields: [
    //         {
    //           type: "string",
    //           name: "media",
    //           title: "Choose Social Media",
    //           options: {
    //             list: [
    //               { title: "Twitter", value: "twitter" },
    //               { title: "Facebook", value: "facebook" },
    //               { title: "Instagram", value: "instagram" },
    //               { title: "Linkedin", value: "linkedin" },
    //               { title: "Youtube", value: "youtube" }
    //             ]
    //           }
    //         },
    //         {
    //           type: "url",
    //           name: "url",
    //           title: "Full Profile URL"
    //         }
    //       ],
    //       preview: {
    //         select: {
    //           title: "media",
    //           subtitle: "url"
    //         }
    //       }
    //     }
    //   ]
    // },
    {
      name: "w3ckey",
      type: "string",
      title: "Web3Forms Access Key",
      description:
        "Enter Access key obtained from web3forms.com. It is required to make the form work."
    },
  ],
  initialValue: {
    marquee_speed: 10,
  },
};
