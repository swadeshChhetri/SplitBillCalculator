import React from "react";
import styled from "styled-components";

const FieldWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

function InputField({ label, value, onChange, placeholder, type, prefix }) {
  return (
    <FieldWrapper>
      <Label>{label}</Label>
      <div style={{ position: "relative" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#888",
            }}
          >
            {prefix}
          </span>
        )}
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
