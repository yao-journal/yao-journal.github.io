export default {
  layout: "diary-entry.njk",
  eleventyComputed: {
    // 关掉“显示在网站上”的日记不会生成页面
    permalink: (data) => (data.published === false ? false : `/diary/${data.page.inputPath.split("/").pop().replace(/\.md$/, "")}/`),
  },
};
