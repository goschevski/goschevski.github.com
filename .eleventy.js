const Nunjucks = require('nunjucks');

module.exports = function(eleventyConfig) {
  const nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader('src/templates')
  );

  nunjucksEnvironment.addFilter('readableDate', date => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  });

  nunjucksEnvironment.addFilter('fullUrl', url => {
    return new URL(url, 'https://www.goschevski.com').href;
  });

  nunjucksEnvironment.addFilter('currentYear', text => {
    return text + new Date().getFullYear();
  });

  nunjucksEnvironment.addFilter('toISOString', date => {
    return date.toISOString();
  });

  nunjucksEnvironment.addFilter('toUTC', date => {
    return date.toUTCString();
  });

  eleventyConfig.setLibrary('njk', nunjucksEnvironment);

  eleventyConfig.addCollection('posts', (collectionApi) => {
    return collectionApi
      .getAllSorted()
      .reverse()
      .filter((item) => {
        return 'collection' in item.data;
      });
  });

  return {
    dir: {
      input: 'src/content',
      includes: '../../src/templates',
      output: 'dist'
    }
  };
};
