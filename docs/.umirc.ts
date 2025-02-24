import { defineConfig } from "umi";

export default defineConfig({
  title: "ant-theme-builder",
  outputPath: "dist-docs",
  routes: [
    { path: "/", redirect: "/ant" },
    {
      path: "/ant",
      name: "Ant组件库",
      component: "Ant",
    },
  ],
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  define: {
    "process.env.NODE_ENV": process.env.NODE_ENV,
    "process.env.HMR": process.env.HMR,
    "process.env.SOCKET_SERVER": process.env.ERROR_OVERLAY,
  },
});
