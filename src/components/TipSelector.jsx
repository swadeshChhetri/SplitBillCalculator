import React from 'react';
import styled from 'styled-components';

const TipWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

function TipSelector({ tip, setTip }) {
  const predefinedTips = [0, 5, 10, 15];

  return (
    <TipWrapper>
      <label>Tip Percentage</label>
      <RadioWrapper>
        {predefinedTips.map((val) => (
          <button
            key={val}
            onClick={() => setTip(val)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: tip == val ? '2px solid #007bff' : '1px solid #ccc',
              background: tip == val ? '#e9f4ff' : '#fff',
              cursor: 'pointer'
            }}
            type="button"
          >
            {val}%
          </button>
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
