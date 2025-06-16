import React from "react";
import styled from "styled-components";

const Result = styled.div`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

function ResultDisplay({ perPerson, currency, roundUp }) {
  return (
    <Result>
       {roundUp && <p>(Rounded)</p>}
      Each person pays: {currency}{perPerson.toFixed(2)}
    </Result>
  );
}

export default ResultDisplay;
