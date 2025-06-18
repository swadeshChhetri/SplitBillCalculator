import React from "react";
import styled from "styled-components";

/**
 * Container for the tip selector section
 */
const TipWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

/**
 * Container for tip options (buttons + custom input)
 */
const RadioWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

/**
 * Custom input field for manual tip entry
 */
const Input = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

/**
 * Styled tip button (used for predefined values)
 */
const TipButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({ selected, theme }) =>
    selected ? theme.cardBg : theme.inputBg};
  color: ${({ theme }) => theme.text};
  border: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.text}` : `1px solid ${theme.borderColor}`};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  &:active {
    transform: scale(0.97);
  }
`;

/**
 * TipSelector Component
 *
 * Allows users to select a predefined tip percentage or enter a custom value.
 *
 * Props:
 * - tip: number | string — The currently selected tip percentage
 * - setTip: function — Setter function to update the selected tip
 */
function TipSelector({ tip, setTip }) {
  const predefinedTips = [0, 5, 10, 15];

  return (
    <TipWrapper>
      <label>Tip Percentage</label>
      <RadioWrapper>
        {predefinedTips.map((val) => (
          <TipButton
            key={val}
            onClick={() => setTip(val)}
            selected={parseFloat(tip) === val}
            type="button"
          >
            {val}%
          </TipButton>
        ))}
        <Input
          type="number"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          placeholder="Custom"
          min="0"
        />
      </RadioWrapper>
    </TipWrapper>
  );
}

export default TipSelector;
