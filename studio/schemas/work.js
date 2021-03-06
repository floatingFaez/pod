export default {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
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
        // {
        //   name: "caption",
        //   type: "string",
        //   title: "Image caption",
        //   description: "Appears below image.",
        //   options: {
        //     isHighlighted: true
        //   }
        // },
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
      name: "campaign_name",
      title: "Campaign Name",
      type: "string"
    },
    {
      name: "campaign_city",
      title: "Campaign City",
      type: "string"
    },
    {
      name: "campaign_country",
      title: "Campaign Country",
      type: "string"
    },
    {
      name: "campaign_lat",
      title: "Campaign Latitude",
      type: "string"
    },
    {
      name: "campaign_long",
      title: "Campaign Langitude",
      type: "string"
    },
    {
      name: "campaign_date",
      title: "Campaign Date",
      type: "string"
    },
    {
      name: "campaign_year",
      title: "Campaign year",
      type: "string"
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
