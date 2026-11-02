export default {
  layout: "trip.njk",
  eleventyComputed: {
    permalink: (data) => (data.published === false ? false : `/travel/${data.page.inputPath.split("/").pop().replace(/\.md$/, "")}/`),
  },
};
