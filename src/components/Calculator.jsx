import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "./InputField";
import TipSelector from "./TipSelector";
import ResultDisplay from "./ResultDisplay";
import { calculateSplit } from "../utils/calculateSplit";
import { validateInputs } from "../utils/validateInput";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, color 0.3s ease;
`;

function Calculator() {
  const [currency, setCurrency] = useState("₹");
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("");
  const [people, setPeople] = useState("");
  const [perPerson, setPerPerson] = useState(0);
  const [splitUnevenly, setSplitUnevenly] = useState(false);
  const [customAmounts, setCustomAmounts] = useState([]);
  const [customError, setCustomError] = useState("");
  const [roundUp, setRoundUp] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    const isValid = validateInputs(bill, tip, people);
    const totalWithTip = Number(bill) + (Number(bill) * Number(tip)) / 100;

    if (!isValid) {
      setPerPerson(0);
      if (people === "0") setCustomError("People must be at least 1");
      return;
    }

    setCustomError("");

    if (splitUnevenly) {
      const sum = customAmounts.reduce(
        (acc, curr) => acc + Number(curr || 0),
        0
      );
      if (sum === totalWithTip) {
        setCustomError("");
        if (roundUp) {
          const rounded = customAmounts.map((a) => Math.ceil(Number(a || 0)));
          setCustomAmounts(rounded);
        }
      } else {
        setCustomError(`Sum should be exactly ₹${totalWithTip.toFixed(2)}.`);
      }
    } else {
      let result = calculateSplit(Number(bill), Number(tip), Number(people));
      if (roundUp) {
        result = Math.ceil(result);
      }
      setPerPerson(result);
    }
  }, [bill, tip, people, splitUnevenly, customAmounts]);

  const getResultText = () => {
    if (splitUnevenly && customError === "") {
      return customAmounts
        .map(
          (amt, idx) =>
            `Person ${idx + 1}: ${currency}${Number(amt).toFixed(2)}`
        )
        .join("\n");
    }
    return `Each person pays: ${currency}${perPerson.toFixed(2)}`;
  };

  const handleCopy = () => {
    const text = getResultText();
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage("Copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    });
  };

  const handleShare = () => {
    const text = getResultText();
    if (navigator.share) {
      navigator
        .share({
          title: "Split Bill Result",
          text,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Web Share not supported on this device.");
    }
  };

  return (
    <Wrapper>
      <h2>Split Bill Calculator</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>Currency: </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{
            padding: "0.4rem",
            borderRadius: "8px",
            marginLeft: "0.5rem",
          }}
        >
          <option value="₹">INR (₹)</option>
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
        </select>
      </div>
      <InputField
        label="Total Bill"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        placeholder="e.g., 1000"
        type="number"
        prefix={currency}
      />
      <TipSelector tip={tip} setTip={setTip} />
      <InputField
        label="Number of People"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
        placeholder="e.g., 3"
        type="number"
      />
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        <input
          type="checkbox"
          checked={splitUnevenly}
          onChange={() => setSplitUnevenly(!splitUnevenly)}
        />{" "}
        Split Unevenly?
      </label>

      {splitUnevenly && customError === "" ? (
        <div style={{ marginTop: "1.5rem", fontWeight: "bold" }}>
          <h4>Custom Amounts:</h4>
          {customAmounts.map((amt, idx) => (
            <p key={idx}>
              Person {idx + 1}: {currency}
              {Number(amt).toFixed(2)}
            </p>
          ))}
        </div>
      ) : (
        <ResultDisplay
          perPerson={perPerson}
          currency={currency}
          roundUp={roundUp}
        />
      )}

      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        <input
          type="checkbox"
          checked={roundUp}
          onChange={() => setRoundUp(!roundUp)}
        />{" "}
        Round up per person?
      </label>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={handleCopy}>📋 Copy</button>
        <button onClick={handleShare}>📤 Share</button>
      </div>
      {copyMessage && <p style={{ color: 'green' }}>{copyMessage}</p>}

      {customError && <p style={{ color: "red" }}>{customError}</p>}
    </Wrapper>
  );
}

export default Calculator;
