module.exports = {
  transpileDependencies: ["vuex-module-decorators"],
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/scss/variables.scss`
        data: `
       @import "@/assets/common.scss";
       `,
      },
    },
  },
};
