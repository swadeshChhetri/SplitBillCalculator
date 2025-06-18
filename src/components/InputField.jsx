import React from "react";
import styled from "styled-components";

/**
 * Wrapper for each form field with spacing
 */
const FieldWrapper = styled.div`
  margin-bottom: 1.2rem;
  margin-top: 0.8rem;
`;

/**
 * Label styling for input fields
 */
const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;

/**
 * Input field styling
 */
const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

/**
 * InputField Component
 *
 * Reusable input component with optional currency/unit prefix.
 *
 * Props:
 * - label: string - Label text shown above the input
 * - value: string/number - Current input value
 * - onChange: function - Change handler for input
 * - placeholder: string - Placeholder for the input
 * - type: string - Input type (e.g., 'text', 'number')
 * - prefix: string (optional) - Text prefix (like currency symbol)
 */
function InputField({ label, value, onChange, placeholder, type, prefix }) {
  return (
    <FieldWrapper>
      {/* Label for input field */}
      <Label>{label}</Label>

      {/* Wrapper for input and optional prefix */}
      <div style={{ position: "relative" }}>
        {/* If a prefix is provided (e.g., ₹), show it inside the input */}
        {prefix && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#888",
              fontSize: "0.95rem",
            }}
          >
            {prefix}
          </span>
        )}

        {/* Input element with conditional left padding if prefix exists */}
        <Input
          style={{ paddingLeft: prefix ? "1.8rem" : "0.6rem" }}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min="0"
        />
      </div>
    </FieldWrapper>
  );
}

export default InputField;
