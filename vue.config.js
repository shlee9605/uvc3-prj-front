const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://localhost:8080"
  }
});

// vuejs 프록시 설정하는 방법
// 백엔드 서버