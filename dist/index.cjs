// google-news-sitemap 1.1.1 by Dimas Lanjaka <dimaslanjaka@gmail.com> (https://www.webmanajemen.com)
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var moment = require('moment');
var xmlbuilder = require('xmlbuilder');

const root = {
    urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        '@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd',
        url: []
    }
};
const genres = ['Blog', 'OpEd', 'Opinion', 'PressRelease', 'Satire', 'UserGenerated'];
function parse(prepare) {
    return {
        loc: prepare.loc,
        'news:news': {
            'news:publication': {
                'news:language': prepare.news.publication.language,
                'news:name': prepare.news.publication.name
            },
            'news:title': prepare.news.title,
            'news:publication_date': prepare.news.publication_date
        }
    };
}
class GoogleNewsSitemap {
    /**
     * Max 1000 items
     */
    items = [];
    static date_pattern = 'YYYY-MM-DDTHH:mm:ssZ';
    /**
     * Reset sitemap data
     */
    clear() {
        this.items.length = 0;
        root.urlset.url.length = 0;
    }
    /**
     * add data to sitemap
     * @param item object information item
     * @returns
     */
    add(item) {
        if (!item.title && !item.publication_name && item.publication_date)
            return;
        let author = 'Dimas Lanjaka (Default User)';
        if (typeof item.publication_name == 'string') {
            author = item.publication_name;
        }
        else if (typeof item.publication_name == 'object') {
            if (item.publication_name.name)
                author = item.publication_name.name;
        }
        const build = {
            loc: item.location,
            news: {
                publication: { name: author, language: item.publication_language || 'en' },
                publication_date: item.publication_date || moment(new Date(), moment.ISO_8601).format(GoogleNewsSitemap.date_pattern),
                title: item.title,
                genres: item.genres || 'Blog'
            }
        };
        if (typeof item.keywords == 'string') {
            build.news.keywords = item.keywords;
        }
        else if (Array.isArray(item.keywords)) {
            build.news.keywords = item.keywords.join(',');
        }
        root.urlset.url.push(parse(build));
        this.items.push(build);
        return build;
    }
    /**
     * get total sitemap data
     * @returns
     */
    getTotal() {
        return this.items.length;
    }
    /**
     * turn all data to xml string
     * @returns
     */
    toString() {
        return xmlbuilder.create(root, { version: '1.0', encoding: 'UTF-8' }).end({ pretty: true });
    }
}

exports.GoogleNewsSitemap = GoogleNewsSitemap;
exports.default = GoogleNewsSitemap;
exports.genres = genres;
exports.parse = parse;
exports.root = root;
//# sourceMappingURL=index.cjs.map
