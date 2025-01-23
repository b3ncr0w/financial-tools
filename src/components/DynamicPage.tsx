import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getData } from '../cms/getData';
import { Page } from './Page';
import { useEffect } from 'react';
import { config } from '../cms/config';

export function DynamicPage() {
  const { language } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPage = getData()[language].pages[pathname];
    
    if (!currentPage) {
      // Try to find page in other languages
      const availableLanguages = Object.keys(config.languages);
      for (const lang of availableLanguages) {
        const pages = Object.values(getData()[lang].pages);
        const matchingPage = pages.find(page => 
          page.slug === pathname ||
          Object.values(page.slugs || {}).includes(pathname)
        );

        if (matchingPage?.slugs?.[language]) {
          // Redirect to the correct slug for current language
          navigate(matchingPage.slugs[language], { replace: true });
          return;
        }
      }

      navigate('/404');
    }
  }, [pathname, language]);

  const page = getData()[language].pages[pathname];
  if (!page) return null;

  return (
    <Page {...page} />
  );
} 