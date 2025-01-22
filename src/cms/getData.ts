import { config } from "./config";
import { CMS, Article } from "./types";

type PageKeys = keyof typeof config.pages;

async function importFiles() {
  const data: Record<string, CMS> = {};
  const languages = Object.keys(config.languages);
  const slugMappings: Record<string, Record<string, string>> = {};
  
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
    data[lang] = {
      navigation: [],
      meta: { title: '' } as CMS['meta'],
      home: { title: '', description: '', content: [], articles: [] },
      about: { title: '', description: '', content: [] },
      articles: {}
    };

    try {
      // Import meta
      const meta = await import(/* @vite-ignore */ `./${lang}/${config.meta}`);
      data[lang].meta = meta.default;
    } catch (error) {
      console.warn(`Meta file not found for language: ${lang}`);
    }

    try {
      // Import navigation
      const navigation = await import(/* @vite-ignore */ `./${lang}/${config.navigation}`);
      data[lang].navigation = navigation.default;
    } catch (error) {
      console.warn(`Navigation file not found for language: ${lang}`);
    }

    // Import articles
    try {
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
      data[lang].home.articles = Object.values(articles).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.warn(`Articles not found for language: ${lang}`);
    }

    // Import pages
    for (const [pageName, pageConfig] of Object.entries(config.pages)) {
      try {
        const page = await import(/* @vite-ignore */ `./${lang}/${pageConfig.file}`);
        data[lang][pageName as PageKeys] = {
          ...page.default,
          articles: pageName === 'home' ? data[lang].home.articles : undefined
        };
      } catch (error) {
        console.warn(`Page ${pageName} not found for language: ${lang}`);
      }
    }
  }

  return { data, slugMappings };
}

export const { data: getData, slugMappings: articleSlugs } = await importFiles();
