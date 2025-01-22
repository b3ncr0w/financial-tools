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
  }
} as const; 