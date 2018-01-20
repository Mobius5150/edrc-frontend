const url		  = require('url');
const path        = require('path');
const Metalsmith  = require('metalsmith');
const markdown    = require('metalsmith-markdown');
const layouts     = require('metalsmith-layouts');
const permalinks  = require('metalsmith-permalinks');
const rootPath 	  = require('metalsmith-rootpath');
const less 		  = require('mb-metalsmith-less');
const ignore 	  = require('metalsmith-ignore');
const metalsmithPrism = require('metalsmith-prism');
const collections = require('metalsmith-collections');

const metadata = {
	title: "EDRC Docs",
	description: "Eagle Design Rule Check Documentation",
	generator: "Metalsmith",
	siteurl: "/docs/",
	baseTitle: 'EDRC',
};

const textFiles = ['md', 'html'];

Metalsmith(__dirname)
	.metadata(metadata)
	.source(path.join(__dirname, './src'))
	.destination(path.join(__dirname, '../build/docs'))
	.clean(true)
	.use(collections({
        guides: {
            pattern: ['index.md', 'guides/*.md']
		},
		reference: {
            pattern: ['reference/*.md']
        },
    }))
	.use(less({ useDynamicSourceMap: true }))
	.use(baseTitle())
	.use(markdown( { langPrefix: 'language-' } ))
	.use(metalsmithPrism())
	.use(permalinks({
		relative: false
	}))
	.use(layouts({
		engine: 'handlebars',
		default: 'layout.html',
		pattern: '**/*.html'
	}))
	.use(linksFromSiteUrl())
	.use(rootPath())
	.use(replacements())
	.use(ignore([
		'**/*.less'
	]))
	.build(function(err, files) {
		if (err) { throw err; }
	});

function linksFromSiteUrl() {
	return function (files, metalsmith, done) {
		Object.keys(files).forEach(fName => {
			if (isText(fName)) {
				const file = files[fName];
				file.contents = new Buffer(file.contents.toString().replace(/href\s*=\s*\"(?!\S+\:)([^"]+)\"/g, function (match, p1) {
					if (p1[0] === '/') {
						p1 = p1.substr(1);
					}

					const resolved = url.resolve(metadata.siteurl, p1);
					return ` href="${resolved}" `;
				}));
			}
		});
		done();
	};
}

function replacements() {
	return function (files, metalsmith, done) {
		Object.keys(files).forEach(fName => {
			if (isText(fName)) {
				const file = files[fName];
				file.contents = new Buffer(file.contents.toString().replace(/\{\{([^}]+)\}\}/g, function (match, p1) {
					if (file[p1]) {
						return file[p1];
					} else if (file._metadata[p1]) {
						return file._metadata[p1];
					} else {
						return p1;
					}
				}));
			}
		});
		done();
	};
};

function baseTitle() {
	return function (files, metalsmith, done) {
		Object.keys(files).forEach(fName => {
			if (isText(fName)) {
				const file = files[fName];
				file.baseTitle = file.title || metadata.title;
				if (file.title && file.title !== metadata.title) {
					file.title = `${metadata.baseTitle}: ${file.title}`;
				}
			}
		});
		done();
	}; 
}

function isText(fileName) {
	for (const e in textFiles) {
		const ext = textFiles[e];
		if (fileName.endsWith(ext)) {
			return true;
		}
	};

	return false;
}