export default {
    name: "events",
    title: "Events",
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
        name: "countries",
        title: "Countries",
        type: "string",
        description: "Enter event locations here. e.g: USA / Maxico / Spain",
      },
      {
        name: "body",
        title: "Body",
        type: "blockContent"
      },
      {
        name: "startDate",
        title: "Start Date",
        type: "datetime"
      },
      {
        name: "endDate",
        title: "End Date",
        type: "datetime"
      },
      {
        name: "bookingEndDate",
        title: "Booking Deadline",
        type: "datetime"
      },
      {
        name: "publishedAt",
        title: "Published at",
        type: "datetime"
      },
      {
        name: "buttonText",
        title: "Button Text",
        type: "string"
      }
    ],
  
    preview: {
      select: {
        title: "title",
        media: "mainImage"
      },
      prepare(selection) {
        const { author } = selection;
        return Object.assign({}, selection, {
          subtitle: author && `by ${author}`
        });
      }
    }
  };
  