import styled from "styled-components";
import { Article } from "../cms/types";
import { Link } from "react-router-dom";

interface ArticleGridProps {
  articles?: Article[];
}

export function ArticleGrid({ articles = [] }: ArticleGridProps) {
  return (
    <Grid>
      {articles.map((article) => (
        <ArticleCard key={article.slug} to={`/articles/${article.slug}`}>
          <ArticleTitle>{article.title}</ArticleTitle>
          {article.description && <ArticleDescription>{article.description}</ArticleDescription>}
          <ArticleDate>{new Date(article.date).toLocaleDateString()}</ArticleDate>
        </ArticleCard>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

const ArticleCard = styled(Link)`
  padding: var(--spacing-md);
  background: var(--color-surface);
  border-radius: 8px;
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ArticleTitle = styled.h3`
  margin: 0 0 var(--spacing-sm);
  font-size: var(--font-size-h3);
`;

const ArticleDescription = styled.p`
  margin: 0 0 var(--spacing-md);
  opacity: 0.8;
`;

const ArticleDate = styled.time`
  font-size: 0.9em;
  opacity: 0.6;
`; 