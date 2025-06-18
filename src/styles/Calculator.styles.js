import styled, { keyframes } from "styled-components";

// ==========================
// Styled Components
// ==========================
export const ToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

export const ToggleButton = styled.button`
  background: ${({ theme }) => theme.cardBg || "#fff"};
  color: ${({ theme }) => theme.text || "#333"};
  border: 2px solid ${({ theme }) => theme.primary || "#007bff"};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary || "#007bff"};
    color: white;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div`
  animation: ${fadeInUp} 0.6s ease;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  position: relative;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, color 0.3s ease;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 0.6rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  margin-top: 0.3rem;
  width: 100%;
  &:hover,
  &:focus {
    border-color: #999;
  }
`;

export const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  background: transparent;
  color: ${({ theme }) => theme.primary || "#007bff"};
  border: 2px solid ${({ theme }) => theme.primary || "#007bff"};
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary || "#007bff"};
    color: white;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const Message = styled.p`
  margin-top: 1rem;
  color: ${({ error }) => (error ? "red" : "green")};
  font-weight: 500;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
`;