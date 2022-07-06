export default {
  name: "home",
  type: "document",
  title: "Home",
  fieldsets: [
    {
      title: "Events",
      name: "events",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "CTA",
      name: "cta",
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
      title: "Page Title",
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
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in page description, and also for SEO",
      type: "text",
      rows: 2,
      validation: Rule => Rule.max(200)
    },
    {
      name: "cta_title",
      type: "string",
      title: "CTA Title",
      fieldset:"cta"
    },
    {
      name: "cta_subtitle",
      type: "string",
      title: "CTA Subtitle",
      fieldset:"cta"
    },
    {
      name: "ctaImage",
      title: "CTA image",
      type: "image",
      fieldset:"cta",
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
      name: "body",
      description:"The texts is used in CTA content",
      title: "Description",
      type: "text",
      rows:4,
      fieldset:"cta"
    },    
    {
      name: "cta_button_text",
      type: "string",
      title: "CTA Button Text",
      fieldset:"cta"
    },
  ],
};
