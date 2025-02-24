import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

export type Theme = "purple" | "red" | "blue";

export interface ThemeContextProps {
  theme: Theme;
  setTheme: React.Dispatch<any>;
}

export const ThemeDefaultValue: ThemeContextProps = {
  theme: "purple",
  setTheme: () => null,
};
export const ThemeContext = createContext<ThemeContextProps>(ThemeDefaultValue);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: React.ReactNode;
  storageKey?: string;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  storageKey = "themeData",
  ...props
}) => {
  const [theme, _setTheme] = useState(() => localStorage.getItem(storageKey) || "purple");

  function changeTheme(colorName: string, light: any, isVariable = false) {
    const themeUrlPrefix = "./theme";
    let isLight: boolean;
    if (typeof light === "string") {
      isLight = light === "light" ? true : false;
    } else {
      isLight = light;
    }

    let styleLink: HTMLLinkElement | null = document.getElementById(
      "theme-style"
    ) as HTMLLinkElement;
    let dxStyleLink: HTMLLinkElement | null = document.getElementById(
      "dx-theme-style"
    ) as HTMLLinkElement;
    let antCustom = "ant.custom";
    let antType = isVariable ? "variable" : isLight ? "light" : "dark";
    const timestamp = new Date().getTime();

    if (styleLink !== null && dxStyleLink !== null) {
      // 假如存在id为theme-style 的link标签，直接修改其href
      if (isLight) {
        styleLink.href = `${themeUrlPrefix}/theme-${colorName}/${antCustom}.${antType}.css?time=${timestamp}`;
        dxStyleLink.href = `${themeUrlPrefix}/theme-${colorName}/dx.generic.cpas-cloud-light-scheme.css?time=${timestamp}`;
      } else {
        styleLink.href = `${themeUrlPrefix}/theme-${colorName}/${antCustom}.${antType}.css?time=${timestamp}`;
        dxStyleLink.href = `${themeUrlPrefix}/theme-${colorName}/dx.generic.cpas-cloud-dark-scheme.css?time=${timestamp}`;
      }
    } else {
      // 不存在的话，则新建一个
      styleLink = document.createElement("link");
      styleLink.type = "text/css";
      styleLink.rel = "stylesheet";
      styleLink.id = "theme-style";

      dxStyleLink = document.createElement("link");
      dxStyleLink.type = "text/css";
      dxStyleLink.rel = "stylesheet";
      dxStyleLink.id = "dx-theme-style";
      if (isLight) {
        styleLink.href = `${themeUrlPrefix}/theme-${colorName}/ant.custom.${antType}.css?time=${timestamp}`;
        dxStyleLink.href = `${themeUrlPrefix}/theme-${colorName}/dx.generic.cpas-cloud-light-scheme.css?time=${timestamp}`;
      } else {
        styleLink.href = `${themeUrlPrefix}/theme-${colorName}/ant.custom.${antType}.css?time=${timestamp}`;
        dxStyleLink.href = `${themeUrlPrefix}/theme-${colorName}/dx.generic.cpas-cloud-dark-scheme.css?time=${timestamp}`;
      }
      document.body.append(styleLink);
      document.body.append(dxStyleLink);
      let bodyClassName = document.body.className;
      bodyClassName += " dx-theme-generic-typography";
      document.body.className = bodyClassName;
    }
  }

  //message.ts webapp配置信息,消息接收相关
  /**
   * 从 localStorge 加载webApp的用户配置
   * @returns WebAppUserConfig
   */
  function getWebAppUserConfigFromLocalStorge() {
    return {
      cpasMainToken: localStorage.getItem("cpasMainToken"), //用户登录凭证，目前可能用不到，由登录页自动登录后系统自己写即可，先留着备用。 可取值：login返回的token值或空
      cpasPrimaryColor: localStorage.getItem("cpasPrimaryColor"), //主题色名称,可取值: red、blue、cyan、green、orange、purple、yellow,默认: red
      themeData: localStorage.getItem("themeData"), //主题色名称,可取值: red、blue、cyan、green、orange、purple、yellow,默认: red
      cpasTheme: localStorage.getItem("cpasTheme"), //"light",//皮肤名称（用于切换暗黑模式）,可取值: light、dark,默认:l ight
      cpasLanguage: localStorage.getItem("cpasLanguage"), //设置当前显示的语言,可取值: en-US、zh-CN,默认: zh-CN
      cpasTitleBar: localStorage.getItem("cpasTitleBar") == "true", //控制是否显示系统的标题栏（包括系统标题、语言切换、主题色切换、用户卡片等功能）,可取值: true、false,默认: false
      cpasSiderBar: localStorage.getItem("cpasSiderBar") == "true", //控制是否显示左侧导航边栏,可取值: true、false 默认: true
      cpasApiUrl: localStorage.getItem("cpasApiUrl"), //electron主应用的地址,为web应用请求主应用时提供地址,,可取值:动态的,示例(默认值) http://localhost:8070/cpasApi
      cpasUserInfo: localStorage.getItem("cpasUserInfo")
        ? JSON.parse(localStorage.getItem("cpasUserInfo") || "")
        : {}, // electron主应用的登录后的用户信息,可取值: 动态的, 示例 {"usercode":"201801","username":"刘晓红","rolename":"档案管理员","zw":"经理","ssbmcode":null,"aesPassword":"dLaSXYOlT5xIs+sqL0X2DQ==","loginTime":"2022-05-24 15:53:51"}
    };
  }

  // 2022. 06. 30: DOMLoad不会被正确触发, 改为useEffect.
  /**
   * DOMContentLoaded触发前,localStorage里已存储好了 WebAppUserConfig 中的各项值,按字符串存储的
   * 文档加载完毕时,从 localStorage 中加载并执行设置
   */
  // window.addEventListener('DOMContentLoaded', () => {
  //   setWebAppUserConfig(getWebAppUserConfigFromLocalStorge()); //加载 webAppUserConfig
  // });
  useEffect(() => {
    // if (isOpenFromPlatform) {
    //   window.setWebAppUserConfig(getWebAppUserConfigFromLocalStorge()); //加载 webAppUserConfig
    // }
  }, []);

  window.addEventListener(
    "message",
    function (messageEvent) {
      if (
        typeof messageEvent === "object" &&
        Object.prototype.hasOwnProperty.call(messageEvent.data, "cpasPrimaryColor")
      ) {
        window.setWebAppUserConfig(messageEvent.data);
      }
    },
    false
  );

  /**
   * 通过 webAppUserConfig 配置信息来改写自己的属性值 ,如主题颜色,皮肤,是否显示侧边栏,是否显示标题栏,
   * 各个属性值参考含义参考方法 getWebAppUserConfigFromLocalStorge()
   * 最佳实践: 在webapp的的document.load
   * @param {webapp应用配置} webAppUserConfig
   */
  window.setWebAppUserConfig = function (webAppUserConfig: any) {
    //webapp应用段自己的代码 ,以下是我的示例
    document.body.style.setProperty("--cpasPrimaryColor", webAppUserConfig.cpasPrimaryColor); //设置主题颜色
    document.body.style.setProperty(
      "--siderBar-background-color",
      webAppUserConfig.cpasPrimaryColor
    ); //侧边背景颜色

    const { cpasLanguage, themeData, cpasTitleBar, cpasSiderBar, cpasTheme } = webAppUserConfig;
    console.log("web app user config: ", webAppUserConfig);

    if (themeData) {
      if (cpasTheme) {
        changeTheme(themeData, cpasTheme);
      } else {
        changeTheme(themeData, true);
      }
    }
  };

  useEffect(() => {
    if (theme) {
      changeTheme(theme, true, true);
    }
  }, [theme]);

  const setTheme = (theme: Theme) => {
    _setTheme(theme);
    localStorage.setItem(storageKey, theme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
