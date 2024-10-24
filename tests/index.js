const { default: GoogleNewsSitemap } = require('../dist/index');

const builder = new GoogleNewsSitemap();

builder.add({
  location: 'http://example.com/article1',
  title: 'item 1',
  publication_date: 'May 24, 2012',
  publication_language: 'en',
  publication_name: 'Dimas Lanjaka'
});

builder.add({
  location: 'http://example.com/article2',
  title: 'item 2',
  publication_language: 'en',
  publication_date: 'May 25, 2012',
  publication_name: 'Dimas Lanjaka'
});

// reset
builder.clear();

// add other data

builder.add({
  location: 'http://example.com/article3',
  title: 'item 1',
  publication_date: 'May 24, 2014',
  publication_language: 'en',
  publication_name: 'Dimas Lanjaka'
});

builder.add({
  location: 'http://example.com/article4',
  title: 'item 2',
  publication_language: 'en',
  publication_date: 'May 25, 2012',
  publication_name: 'Dimas Lanjaka'
});

console.log(builder.toString());
