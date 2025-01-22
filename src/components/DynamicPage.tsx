import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getData } from '../cms/getData';
import { Page } from './Page';
import { useEffect } from 'react';
import { config } from '../cms/config';

export function DynamicPage() {
  const { pathname } = useLocation();
  const { language } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // Find the page in current language
    const currentPage = getData[language].pages[pathname];
    
    if (!currentPage) {
      // If page not found in current language, search in other languages
      for (const lang of Object.keys(config.languages)) {
        const pages = Object.values(getData[lang].pages);
        const matchingPage = pages.find(page => 
          page.slug === pathname || 
          Object.values(page.slugs || {}).includes(pathname)
        );

        if (matchingPage?.slugs?.[language]) {
          // Found a matching page, redirect to its path in current language
          navigate(matchingPage.slugs[language], { replace: true });
          break;
        }
      }
    }
  }, [pathname, language]);

  const page = getData[language].pages[pathname];

  if (!page) {
    console.log('Page not found:', {
      pathname,
      language,
      availablePages: getData[language].pages,
    });
    return null;
  }

  return <Page {...page} />;
} 