# Google News Sitemap Generator For NodeJS

![npm](https://img.shields.io/npm/v/google-news-sitemap?style=flat-square)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/dimaslanjaka/google-news-sitemap?label=GitHub%20Tag&style=flat-square)

```js
const GoogleNewsSitemap = require('google-news-sitemap');
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
```

[VIEW FULL EXAMPLE](https://github.com/dimaslanjaka/google-news-sitemap/blob/master/tests/index.js)

![image](https://user-images.githubusercontent.com/12471057/174967928-b5841ef9-4e6a-4acb-9b45-1c42a6a21967.png)

Google News related questions? Find answers in the [Google News Help Forum](http://www.google.com/support/forum/p/news?hl=en)

## Site using this package
[www.webmanajemen.com](https://www.webmanajemen.com/sitemap-google-news.xml)
