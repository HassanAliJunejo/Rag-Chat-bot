module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-postcss',
    configurePostCss(postcssOptions) {
      // For Tailwind CSS v4, use the new package
      postcssOptions.plugins.push(require('@tailwindcss/postcss'));
      postcssOptions.plugins.push(require('autoprefixer'));
      return postcssOptions;
    },
  };
};