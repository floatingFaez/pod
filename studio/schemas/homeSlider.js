export default {
  name: "homeSlider",
  type: "document",
  title: "Home Slider",
  fieldsets: [
    {
      title: "Slider Content",
      name: "content",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
  ],
  fields: [
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
      name: "siteTitle",
      type: "string",
      title: "Site Title",
      fieldset: "content"
    },   
    {
      name: "title",
      type: "string",
      title: "Title",
      fieldset: "content"
    },   
    {
      name: "city",
      type: "string",
      title: "City",
      fieldset: "content"
    },   
    {
      name: "country",
      type: "string",
      title: "Country",
      fieldset: "content"
    },
    {
      name: "lat",
      type: "string",
      title: "Latitude",
      fieldset: "content"
    },      
    {
      name: "long",
      type: "string",
      title: "Longitude",
      fieldset: "content"
    },    
    {
      name: "start_date",
      type: "date",
      title: "Start Date",
      fieldset: "content"
    },    
    {
      name: "end_date",
      type: "date",
      title: "End Date",
      fieldset: "content"
    },    
    {
      name: "project_1",
      type: "string",
      title: "Project1",
      fieldset: "content"
    },
    {
      name: "project_2",
      type: "string",
      title: "Project 2",
      fieldset: "content"
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
