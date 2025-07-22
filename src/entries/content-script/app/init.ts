/**
 *  引入 Vuetify 基础样式和其他自定义样式
 *  Vuetify 的其他样式会被自动构造在 /pt-depiler.css 中
 */
import appCss from "./app.css?inline";
import vuetifyCss from "vuetify/styles?inline";

import { createApp } from "vue";

import App from "./App.vue";
import { piniaInstance as pinia } from "@/options/plugins/pinia.ts";
import { i18nInstance as i18n } from "@/options/plugins/i18n.ts";
import { vuetifyInstance as vuetify } from "@/options/plugins/vuetify.ts";

export function mountApp(document: Document, data: any = {}) {
  // 检查站点原来有没有 vuetify 的样式，如果有，则缓存其内容以便于我们的Vuetify挂载后恢复其内容
  const siteVuetifyThemePer = document.querySelector("#vuetify-theme-stylesheet");
  const hasSiteVuetifyThemePre = siteVuetifyThemePer !== null && siteVuetifyThemePer instanceof HTMLLinkElement;
  const siteVuetifyThemePerContent = hasSiteVuetifyThemePre ? siteVuetifyThemePer.textContent || "" : "";

  // 创建一个全局的 div 并挂载到 body 中，作为 shadow DOM 的挂载点
  const contentRoot = document.createElement("div");
  contentRoot.id = "ptd-content-script";
  contentRoot.style.all = "initial"; // 重置样式，避免影响页面样式

  // 添加 vuetify html { ... } 的样式
  contentRoot.style.boxSizing = "border-box";
  contentRoot.style.wordBreak = "normal";

  const shadowRoot = contentRoot.attachShadow({ mode: "open" });

  // 将 css 的样式添加到 shadow DOM 中
  const baseStyleElement = document.createElement("style");
  baseStyleElement.id = "ptd-content-script-style-base";
  baseStyleElement.textContent = (appCss + "\n" + vuetifyCss).replaceAll(":root", ":host");
  shadowRoot.appendChild(baseStyleElement);

  // 添加 mdi 的样式，注意 @font-face 在 shadowDOM 中无法使用，因此需要将其单独处理
  const mdiCssUrl = chrome.runtime.getURL("lib/mdi/materialdesignicons.css");
  fetch(mdiCssUrl)
    .then((res) => res.text())
    .then((cssText) => {
      const mdiCssElement = document.createElement("style");
      mdiCssElement.id = "ptd-content-script-style-mdi";
      // 将 @font-face 部分url中的字段使用 chrome.runtime.getURL 替换，并插入到 html -> body 中
      const cssFontFaceText = cssText
        .replaceAll(/url\("([^"]+)"\)/g, (match, p1) => {
          return `url("${chrome.runtime.getURL(p1)}")`;
        })
        .match(/@font-face\s*{[^}]*}/g)?.[0];
      if (cssFontFaceText) {
        const fontFaceElement = document.createElement("style");
        fontFaceElement.id = "ptd-content-script-style-mdi-font-face";
        fontFaceElement.textContent = cssFontFaceText;
        document.body.appendChild(fontFaceElement);
      }

      mdiCssElement.textContent = cssText.replace(/@font-face\s*{[^}]*}/g, ""); // 只保留其他样式部分
      shadowRoot.appendChild(mdiCssElement);
    });

  // 将构造过程中产生的样式 pt-depiler.css 添加到 shadow DOM 中
  const buildStyleElement = document.createElement("link");
  buildStyleElement.id = "ptd-content-script-style-build";
  buildStyleElement.rel = "stylesheet";
  buildStyleElement.href = chrome.runtime.getURL("pt-depiler.css");
  shadowRoot.appendChild(buildStyleElement);

  // 在 shadow DOM 中创建一个 html 作为所有元素的容器
  const appMountElement = document.createElement("div");
  appMountElement.id = "ptd-content-script-app";
  shadowRoot.appendChild(appMountElement);

  // 插入到页面中
  document.body.append(contentRoot);

  // 挂载 Vue 应用
  const app = createApp(App).use(pinia).use(i18n).use(vuetify);
  app.provide("ptd_data", data); // 提供数据给 Vue 应用
  app.mount(appMountElement);

  // 此时 vuetify 已挂载了我们的主题样式，需要移动到shadow Dom中以免影响网站样式
  const vuetifyTheme = document.querySelector("#vuetify-theme-stylesheet");
  if (vuetifyTheme) {
    const styleContent = vuetifyTheme.textContent || "";
    const vuetifyThemeStylesheet = document.createElement("style");
    vuetifyThemeStylesheet.id = "ptd-content-script-style-vuetify-theme-stylesheet"; // 设置 id 以便于后续查找
    vuetifyThemeStylesheet.textContent = styleContent.replace(":root", ":host");
    shadowRoot.appendChild(vuetifyThemeStylesheet); // 克隆并添加 Vuetify 的主题样式到 shadow DOM 中

    if (hasSiteVuetifyThemePre) {
      vuetifyTheme.textContent = siteVuetifyThemePerContent; // 如果有预先存在的 vuetify 主题样式，则将其内容替换为站点的主题样式
    } else {
      vuetifyTheme.remove(); // 移除页面中的 vuetify 主题样式
    }
  }

  return { contentRoot, shadowRoot, appMountElement, app };
}
