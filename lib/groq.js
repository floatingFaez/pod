import { groq } from "next-sanity";

export const postquery = groq`
*[_type == "post"] | order(_createdAt desc) {
  ...,
  author->,
  categories[]->
}
`;

export const homeSliderQuery = groq`
*[_type == "homeSlider"] | order(_createdAt asc) {
  ...,
}
`;

export const eventQuery = groq`
*[_type == "events"] | order(startDate asc)[0..4] {
  ...,
}
`;

export const homeQuery = groq`
*[_type == "home"][0] {
  ...,
}
`;

export const workQuery = groq`
*[_type == "work"] | order(_createdAt asc) {
  ...,
}
`;

export const fieldTripsQuery = groq`
*[_type == "fieldtrips"][0] {
  ...,
}
`;

export const servicesQuery = groq`
*[_type == "services"][0] {
  ...,
}
`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`;

export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 )
}
`;

export const singleWorkquery = groq`
*[_type == "work" && slug.current == $slug][0] {
  ...
}
`;

export const pathquery = groq`
*[_type == "post"] {
  'slug': slug.current,
}
`;

export const workPathQuery = groq`
*[_type == "work"] {
  'slug': slug.current,
}
`;

export const authorsquery = groq`
*[_type == "author"] {
 ...
}
`;

// test below
// to delete later

export const listquery = groq`
*[_type == "listing"] | order(_createdAt desc) [$start..$end] {
  ...,
  category->
 }
`;

export const productquery = groq`
*[_type == "listing" && slug.current == $slug][0] {
  ...,
  category-> {
    ...,
    enqform->,
    vendorform->
  }
 }
`;
