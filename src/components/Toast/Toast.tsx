import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  max-width: 90vw;
`;

const ToastMessage = styled.div`
  background: var(--color-error);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.9em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  cursor: pointer;
  transition: transform 0.2s;
  max-width: 100%;
  text-align: center;

  &:hover {
    transform: scale(1.02);
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

interface ToastProps {
  messages: string[];
  onDismiss: (index: number) => void;
}

export function Toast({ messages, onDismiss }: ToastProps) {
  if (messages.length === 0) return null;

  return (
    <ToastContainer>
      {messages.map((message, index) => (
        <ToastMessage 
          key={`${message}-${index}`} 
          onClick={() => onDismiss(index)}
        >
          {message}
        </ToastMessage>
      ))}
    </ToastContainer>
  );
} 