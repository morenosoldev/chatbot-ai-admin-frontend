module.exports = {
  process(src, filename, config, options) {
    // Return an object with the processed code
    return {
      code: 'module.exports = "https://example.com/placeholder-image.png";',
    };
  },
};
