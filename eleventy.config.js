import { HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (config) {
  // 自动给链接和图片加上网站路径前缀
  config.addPlugin(HtmlBasePlugin);

  // 自动压缩、缩小照片（手机原图很大，压缩后加载快很多）
  config.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [720, 1440],
    failOnError: false,
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        sizes: "(min-width: 760px) 680px, 100vw",
      },
    },
  });

  config.addPassthroughCopy({ "src/assets": "assets" });
  config.addPassthroughCopy({ "src/media": "media" });

  // 霞鹜文楷：生成网站时从 npm 包复制过来，按需分片加载
  config.addPassthroughCopy({
    "node_modules/lxgw-wenkai-webfont/lxgwwenkai-regular.css": "assets/lxgw/lxgwwenkai-regular.css",
    "node_modules/lxgw-wenkai-webfont/lxgwwenkai-bold.css": "assets/lxgw/lxgwwenkai-bold.css",
    "node_modules/lxgw-wenkai-webfont/files/lxgwwenkai-regular-*.woff2": "assets/lxgw/files",
    "node_modules/lxgw-wenkai-webfont/files/lxgwwenkai-bold-*.woff2": "assets/lxgw/files",
  });

  // 只收录“显示在网站上”的文章，按日期从新到旧
  const visible = (glob) => (api) =>
    api
      .getFilteredByGlob(glob)
      .filter((p) => p.data.published !== false)
      .sort((a, b) => b.date - a.date);
  config.addCollection("diary", visible("src/diary/*.md"));
  config.addCollection("travel", visible("src/travel/*.md"));
  config.addCollection("everything", visible("src/{diary,travel}/*.md"));

  const d = (v) => (v === "now" ? new Date() : new Date(v));
  const pad = (n) => String(n).padStart(2, "0");
  config.addFilter("year", (v) => d(v).getUTCFullYear());
  config.addFilter("md", (v) => `${pad(d(v).getUTCMonth() + 1)}/${pad(d(v).getUTCDate())}`);
  config.addFilter("fullDate", (v) => {
    const x = d(v);
    const wk = "日一二三四五六"[x.getUTCDay()];
    return `${x.getUTCFullYear()} 年 ${x.getUTCMonth() + 1} 月 ${x.getUTCDate()} 日 星期${wk}`;
  });
  // 找出正文里的第一张照片，用作格子封面
  config.addFilter("firstImage", (html = "") => {
    const m = String(html).match(/<img[^>]+src="([^"]+)"/);
    return m ? m[1] : "";
  });
  config.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  config.addFilter("dotDate", (v) => `${d(v).getUTCFullYear()}.${pad(d(v).getUTCMonth() + 1)}.${pad(d(v).getUTCDate())}`);
  config.addFilter("isoDate", (v) => d(v).toISOString().slice(0, 10));
  config.addFilter("excerpt", (html = "", n = 60) => {
    const text = String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return text.length > n ? text.slice(0, n) + "…" : text;
  });
  config.addFilter("byMonth", (items) => {
    const groups = [];
    for (const item of items) {
      const x = d(item.date);
      const label = `${x.getUTCFullYear()} 年 ${x.getUTCMonth() + 1} 月`;
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.items.push(item);
      else groups.push({ label, items: [item] });
    }
    return groups;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false, // 正文里写什么符号都不会出错
    htmlTemplateEngine: "njk",
  };
}
