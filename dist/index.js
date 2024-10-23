"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleNewsSitemap = exports.genres = exports.root = void 0;
exports.parse = parse;
var tslib_1 = require("tslib");
var moment_1 = tslib_1.__importDefault(require("moment"));
var xmlbuilder_1 = tslib_1.__importDefault(require("xmlbuilder"));
exports.root = {
    urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        '@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd',
        url: []
    }
};
exports.genres = ['Blog', 'OpEd', 'Opinion', 'PressRelease', 'Satire', 'UserGenerated'];
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
var GoogleNewsSitemap = /** @class */ (function () {
    function GoogleNewsSitemap() {
        /**
         * Max 1000 items
         */
        this.items = [];
    }
    /**
     * Reset sitemap data
     */
    GoogleNewsSitemap.prototype.clear = function () {
        this.items.length = 0;
        exports.root.urlset.url.length = 0;
    };
    /**
     * add data to sitemap
     * @param item object information item
     * @returns
     */
    GoogleNewsSitemap.prototype.add = function (item) {
        if (!item.title && !item.publication_name && item.publication_date)
            return;
        var author = 'Dimas Lanjaka (Default User)';
        if (typeof item.publication_name == 'string') {
            author = item.publication_name;
        }
        else if (typeof item.publication_name == 'object') {
            if (item.publication_name.name)
                author = item.publication_name.name;
        }
        var build = {
            loc: item.location,
            news: {
                publication: { name: author, language: item.publication_language || 'en' },
                publication_date: item.publication_date || (0, moment_1.default)(new Date(), moment_1.default.ISO_8601).format(GoogleNewsSitemap.date_pattern),
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
        exports.root.urlset.url.push(parse(build));
        this.items.push(build);
        return build;
    };
    /**
     * get total sitemap data
     * @returns
     */
    GoogleNewsSitemap.prototype.getTotal = function () {
        return this.items.length;
    };
    /**
     * turn all data to xml string
     * @returns
     */
    GoogleNewsSitemap.prototype.toString = function () {
        return xmlbuilder_1.default.create(exports.root, { version: '1.0', encoding: 'UTF-8' }).end({ pretty: true });
    };
    GoogleNewsSitemap.date_pattern = 'YYYY-MM-DDTHH:mm:ssZ';
    return GoogleNewsSitemap;
}());
exports.GoogleNewsSitemap = GoogleNewsSitemap;
exports.default = GoogleNewsSitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBK0NBLHNCQVlDOztBQTNERCwwREFBNEI7QUFDNUIsa0VBQW9DO0FBR3ZCLFFBQUEsSUFBSSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSw2Q0FBNkM7UUFDdkQsYUFBYSxFQUFFLGdEQUFnRDtRQUMvRCxZQUFZLEVBQUUsMkNBQTJDO1FBQ3pELHFCQUFxQixFQUNuQixvTkFBb047UUFDdE4sR0FBRyxFQUFFLEVBQUU7S0FDUjtDQUNGLENBQUM7QUFHVyxRQUFBLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFVLENBQUM7QUErQnRHLFNBQWdCLEtBQUssQ0FBQyxPQUFpQjtJQUNyQyxPQUFPO1FBQ0wsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1FBQ2hCLFdBQVcsRUFBRTtZQUNYLGtCQUFrQixFQUFFO2dCQUNsQixlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTtnQkFDbEQsV0FBVyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7YUFDM0M7WUFDRCxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ2hDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1NBQ3ZEO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFrREQ7SUFBQTtRQUNFOztXQUVHO1FBQ0gsVUFBSyxHQUFlLEVBQUUsQ0FBQztJQXdEekIsQ0FBQztJQXREQzs7T0FFRztJQUNILGlDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEIsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFH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