import React from "react";
import styled from "styled-components";

/**
 * Styled container for displaying the final result
 */
const Result = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text || "#333"};
`;

/**
 * ResultDisplay Component
 *
 * Displays the per person amount and shows a note if the amount is rounded.
 *
 * Props:
 * - perPerson: number - Calculated amount per person
 * - currency: string - Currency symbol (e.g., ₹, $, €)
 * - roundUp: boolean - Whether the value was rounded up
 */
function ResultDisplay({ perPerson, currency, roundUp }) {
  return (
    <Result>
      {/* Optional rounding note */}
      {roundUp && <p style={{ fontSize: "0.95rem", marginBottom: "0.3rem", color: "#888" }}>(Rounded)</p>}
      
      {/* Final output */}
      Each person pays: {currency}{perPerson.toFixed(2)}
    </Result>
  );
}

export default ResultDisplay;
