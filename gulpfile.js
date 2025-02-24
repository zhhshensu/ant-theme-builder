const gulp = require("gulp");
const less = require("gulp-less");
const { exec } = require("child_process");
const path = require("path");

// 执行命令行脚本的封装函数
async function runCommand(command) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err}}`);
      return err;
    }
    return true;
  });
}

function clean(theme) {
  return async () => {
    const del = await import("del");
    return del.deleteSync([`dist/${theme}/**`], { force: true });
  };
}

function copyLess(theme) {
  return async () => {
    return gulp
      .src([`src/${theme}/**/*`], { encoding: false }) // 指定文件路径
      .on("error", function (err) {
        console.log(err);
        this.emit("end");
      })
      .pipe(gulp.dest(`dist/${theme}`, { encoding: false }))
      .on("end", () => {
        console.log(`${theme} theme copyed successfully.`);
      }); // 输出目录
  };
}

// 定义 LESS 转换任务
function compileLess(theme) {
  return async () => {
    return gulp
      .src([
        `src/${theme}/ant/ant.custom.light.less`,
        `src/${theme}/ant/ant.custom.dark.less`,
        `src/${theme}/ant/theme-var.less`,
        `src/${theme}/ant/ant.custom.variable.less`,
      ]) // 指定文件路径
      .pipe(
        less({
          // paths: [path.join(__dirname, "node_modules")],
          javascriptEnabled: true,
        })
      )
      .on("error", function (err) {
        console.log(err);
        this.emit("end");
      })
      .pipe(gulp.dest(`dist/${theme}`))
      .on("end", () => {
        console.log(`${theme} theme compiled successfully.`);
      }); // 输出目录
  };
}

// 组合任务
function createThemeTask(theme) {
  const cleanTask = clean(theme);
  cleanTask.displayName = "clean dist";
  cleanTask.description = "清空对应的主题";

  const compileTask = compileLess(theme);
  compileTask.displayName = "antd to css";
  compileTask.description = "生成antd的light和dark css";

  const copyTask = copyLess(theme);
  copyTask.displayName = "less copyTo dist";
  copyTask.description = "复制less到dist";
  return gulp.series(cleanTask, compileTask, copyTask);
  // return gulp.series(cleanTask);
}
// 生成
gulp.task("generate:purple", createThemeTask("theme-purple"));
gulp.task("generate:red", createThemeTask("theme-red"));
gulp.task("generate:blue", createThemeTask("theme-blue"));

// 默认任务
gulp.task("default", gulp.series("generate:purple", "generate:red", "generate:blue"));
