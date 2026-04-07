import "server-only";

export type Locale = "ja" | "en" | "zh";

const dictionaries = {
  ja: () => import("@/messages/ja.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
  zh: () => import("@/messages/zh.json").then((m) => m.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
