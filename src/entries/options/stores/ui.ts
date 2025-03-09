/**
 * 所有和 ui 相关的选项均在本 store 管理
 */
import { defineStore } from "pinia";
import { usePreferredDark } from "@vueuse/core";
import type { supportThemeType, UiSchema } from "@/storage.ts";

export const useUIStore = defineStore("ui", {
  persistWebExt: true,
  state: (): UiSchema => ({
    lang: "zh_CN",
    theme: "light",
    isNavBarOpen: true,
    ignoreWrongPixelRatio: false,
    tableBehavior: {
      setSite: {
        itemsPerPage: -1,
        columns: ["name", "url", "time", "isOffline", "allowSearch", "allowQueryUserInfo"],
        sortBy: [
          { key: "sortIndex", order: "desc" },
          { key: "isOffline", order: "asc" },
          { key: "allowSearch", order: "desc" },
          { key: "allowQueryUserInfo", order: "desc" },
        ],
      },
      searchEntity: {
        itemsPerPage: 50,
        columns: ["site", "title", "category", "size", "seeders", "leechers", "completed", "comments", "time"],
        sortBy: [{ key: "time", order: "desc" }],
      },
    },
  }),
  getters: {
    uiTheme(): Exclude<supportThemeType, "auto"> {
      if (this.theme === "auto") {
        const preferDark = usePreferredDark();
        return preferDark.value ? "dark" : "light";
      }
      return this.theme;
    },

    isLightUiTheme(): boolean {
      return this.uiTheme === "light";
    },
  },
  actions: {
    updateTableBehavior(table: string, key: string, data: any) {
      // @ts-ignore
      this.tableBehavior[table][key] = data;
      this.$save();
    },
  },
});
