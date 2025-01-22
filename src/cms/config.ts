export const config = {
  languages: {
    en: {
      symbol: "EN",
      full: "English",
      locale: "en-US"
    },
    pl: {
      symbol: "PL",
      full: "Polski",
      locale: "pl-PL"
    }
  } as const,
  defaults: {
    language: "en" as const,
    theme: "dark" as const
  },
  navigation: "navigation.yaml",
  meta: "meta.yaml",
  pages: {
    home: {
      path: "/",
      file: "pages/home.yaml"
    },
    about: {
      path: "/about",
      file: "pages/about.yaml"
    }
  }
} as const; 