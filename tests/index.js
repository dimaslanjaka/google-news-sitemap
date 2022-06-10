const { default: GoogleNewsSitemap } = require("google-news-sitemap");

const builder = new GoogleNewsSitemap();
builder.add({
  location: "http://example.com/article1",
  title: "item 1",
  publication_date: "May 24, 2012",
  publication_language: "en",
  publication_name: "Dimas Lanjaka",
});
builder.add({
  location: "http://example.com/article2",
  title: "item 2",
  publication_language: "en",
  publication_date: "May 25, 2012",
  publication_name: "Dimas Lanjaka",
});
console.log(builder.toString());