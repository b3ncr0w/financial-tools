import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getData } from "../cms/getData";
import { Markdown } from "./Markdown";
import { config } from "../cms/config";
import { useEffect } from "react";

export function ArticlePage() {
  const { language } = useApp();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;

    const currentArticle = getData()[language].articles[slug];
    
    if (!currentArticle) {
      // Try to find article in other languages
      const availableLanguages = Object.keys(config.languages);
      for (const lang of availableLanguages) {
        const articles = Object.values(getData()[lang].articles);
        const matchingArticle = articles.find(article => 
          article.slug === slug ||
          Object.values(article.slugs || {}).includes(slug)
        );

        if (matchingArticle?.slugs?.[language]) {
          // Redirect to the correct slug for current language
          navigate(`/articles/${matchingArticle.slugs[language]}`, { replace: true });
          return;
        }
      }

      navigate('/404');
    }
  }, [slug, language]);

  if (!slug) return null;

  const article = getData()[language].articles[slug as string];
  if (!article) return null;

  const formattedDate = new Intl.DateTimeFormat(config.languages[language].locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(article.date));

  return (
    <Container>
      <Content>
        <Title>{article.title}</Title>
        {article.description && <Description>{article.description}</Description>}
        <StyledDate dateTime={article.date}>{formattedDate}</StyledDate>
        {article.content?.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return <Heading key={index}>{block.text}</Heading>;
            case 'markdown':
              return <Markdown key={index} content={block.text} />;
            default:
              return <Paragraph key={index}>{block.text}</Paragraph>;
          }
        })}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Content = styled.article`
  width: 100%;
  max-width: 800px;
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: 8px;
  color: var(--color-text);
`;

const Title = styled.h1`
  margin: 0 0 var(--spacing-md);
  font-size: var(--font-size-h1);
`;

const Description = styled.p`
  margin: 0 0 var(--spacing-md);
  font-size: 1.2em;
  opacity: 0.8;
`;

const StyledDate = styled.time`
  display: block;
  margin: 0 0 var(--spacing-lg);
  opacity: 0.6;
`;

const Heading = styled.h2`
  margin: var(--spacing-lg) 0 var(--spacing-md);
  font-size: var(--font-size-h2);
`;

const Paragraph = styled.p`
  margin: 0 0 var(--spacing-md);
  line-height: 1.6;
`; 