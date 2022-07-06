// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import homeSlider from "./homeSlider";
import post from "./post";
import home from "./home";
import work from "./work";
import fieldtrips from "./fieldtrips";
import services from "./services";
import author from "./author";
import siteconfig from "./siteConfig";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    home,
    post,
    work,
    author,
    category,
    homeSlider,
    siteconfig,
    fieldtrips,
    services,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent
  ])
});
