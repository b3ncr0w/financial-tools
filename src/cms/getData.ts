import { config } from "./config";
import { CMS, Article, Page } from "./types";

async function importFiles() {
  const data: Record<string, CMS> = {};
  const languages = Object.keys(config.languages);
  const slugMappings: Record<string, Record<string, string>> = {};
  const pageSlugMappings: Record<string, Record<string, string>> = {};

  // Initialize data structure for all languages
  for (const lang of languages as Array<keyof typeof config.languages>) {
    data[lang] = {
      navigation: [],
      meta: { title: '' },
      articles: {},
      pages: {}
    } as CMS;

    // Load meta
    try {
      const meta = await import(/* @vite-ignore */ `/src/cms/${lang}/meta.yaml`);
      data[lang].meta = meta.default;
    } catch (error) {
      console.warn(`Meta file not found for language: ${lang}`);
    }
  }

  // Load and process pages first
  for (const lang of languages as Array<keyof typeof config.languages>) {
    try {
      const pageFiles = import.meta.glob<{ default: Page }>(
        './*/pages/*.yaml',
        { eager: true }
      );
      
      for (const path in pageFiles) {
        const langFromPath = path.split('/')[1];
        if (langFromPath === lang) {
          const page = pageFiles[path].default;
          const pageId = page.id;
          
          if (!pageSlugMappings[pageId]) {
            pageSlugMappings[pageId] = {};
          }
          
          const pagePath = page.slug.startsWith('/') ? page.slug : `/${page.slug}`;
          pageSlugMappings[pageId][lang] = pagePath;
          
          data[lang].pages[pagePath] = {
            ...page,
            slugs: pageSlugMappings[pageId]
          };
        }
      }

      // Generate navigation from available pages
      data[lang].navigation = Object.values(data[lang].pages)
        .sort((a, b) => (a.order || 999) - (b.order || 999))
        .map(page => ({
          text: page.menuTitle || page.title,
          url: page.slug.startsWith('/') ? page.slug : `/${page.slug}`
        }));

    } catch (error) {
      console.warn(`Pages not found for language: ${lang}`);
    }
  }

  // First pass: collect all articles and their translations
  for (const lang of languages as Array<keyof typeof config.languages>) {
    const articleFiles = import.meta.glob<{ default: Article }>(
      './**/articles/*.yaml',
      { eager: true }
    );
    
    for (const path in articleFiles) {
      const langFromPath = path.split('/')[1];
      if (langFromPath === lang) {
        const article = articleFiles[path].default;
        const articleId = article.id;
        
        // Initialize mapping for this article if not exists
        if (!slugMappings[articleId]) {
          slugMappings[articleId] = {};
        }
        
        // Add mapping for current language
        slugMappings[articleId][lang] = article.slug;
      }
    }
  }

  // Second pass: load articles with mappings
  for (const lang of languages as Array<keyof typeof config.languages>) {
    try {
      // Import articles
      const articles: Record<string, Article> = {};
      const articleFiles = import.meta.glob<{ default: Article }>(
        './**/articles/*.yaml',
        { eager: true }
      );
      
      for (const path in articleFiles) {
        const langFromPath = path.split('/')[1];
        if (langFromPath === lang) {
          const article = articleFiles[path].default;
          const articleId = article.id;
          
          articles[article.slug] = {
            ...article,
            slugs: slugMappings[articleId]
          };
        }
      }
      
      data[lang].articles = articles;
    } catch (error) {
      console.warn(`Articles not found for language: ${lang}`);
    }
  }

  // Update pages that should display articles
  for (const lang of languages as Array<keyof typeof config.languages>) {
    const sortedArticles = Object.values(data[lang].articles).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Add articles to any page that needs them
    Object.values(data[lang].pages).forEach(page => {
      if (page.showArticles) {
        page.articles = sortedArticles;
      }
    });
  }

  return { data, slugMappings, pageSlugMappings };
}

let cmsData: {
  data: Record<string, CMS>;
  slugMappings: Record<string, Record<string, string>>;
  pageSlugMappings: Record<string, Record<string, string>>;
} | null = null;

export async function initializeCMSData() {
  if (!cmsData) {
    cmsData = await importFiles();
  }
  return cmsData;
}

export function getCMSData() {
  if (!cmsData) {
    throw new Error('CMS data not initialized. Call initializeCMSData first.');
  }
  return cmsData;
}

// Export individual getters
export function getData() {
  return getCMSData().data;
}

export function getArticleSlugs() {
  return getCMSData().slugMappings;
}

export function getPageSlugs() {
  return getCMSData().pageSlugMappings;
}
