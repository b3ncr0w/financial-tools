import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <Container>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Container>
  );
}

const Container = styled.div`
  h1, h2, h3, h4, h5, h6 {
    color: var(--color-text);
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }

  p {
    margin-bottom: var(--spacing-md);
    line-height: 1.6;
  }

  ul, ol {
    margin-bottom: var(--spacing-md);
    padding-left: var(--spacing-lg);
  }

  code {
    background: var(--color-surface);
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
`; 