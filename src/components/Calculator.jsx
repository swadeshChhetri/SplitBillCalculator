import React, { useState, useEffect, useMemo, useCallback } from "react";

import InputField from "./InputField";
import TipSelector from "./TipSelector";
import ResultDisplay from "./ResultDisplay";
import { calculateSplit } from "../utils/calculateSplit";
import { validateInputs } from "../utils/validateInput";
import { FiCopy, FiShare2, FiMoon, FiSun } from "react-icons/fi";
import {
  ToggleContainer,
  ToggleButton,
  Wrapper,
  Section,
  Label,
  Select,
  Checkbox,
  ButtonGroup,
  Button,
  Message,
  Row,
} from "../styles/Calculator.styles";

// ==========================
// Calculator Component
// ==========================
const Calculator = ({ darkMode, setDarkMode }) => {
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

  // Memoized total including tip
  const totalWithTip = useMemo(() => {
    return Number(bill) + (Number(bill) * Number(tip)) / 100;
  }, [bill, tip]);

  // Recalculate per-person amount on input change
  useEffect(() => {
    const isValid = validateInputs(bill, tip, people);

    if (!isValid) {
      setPerPerson(0);
      if (people === "0") setCustomError("People must be at least 1");
      return;
    }

    setCustomError("");

    if (splitUnevenly && Number(people) > 0) {
      const count = Number(people);
      if (customAmounts.length !== count) {
        const newArray = Array(count)
          .fill("")
          .map((_, i) => customAmounts[i] || "");
        setCustomAmounts(newArray);
        return;
      }

      const sum = customAmounts.reduce(
        (acc, curr) => acc + Number(curr || 0),
        0
      );

      if (sum === totalWithTip) {
        if (roundUp) {
          const rounded = customAmounts.map((a) => Math.ceil(Number(a || 0)));
          setCustomAmounts(rounded);
        }
        setCustomError("");
      } else {
        setCustomError(
          `Sum should be exactly ${currency}${totalWithTip.toFixed(2)}.`
        );
      }
    } else {
      let result = calculateSplit(Number(bill), Number(tip), Number(people));
      if (roundUp) {
        result = Math.ceil(result);
      }
      setPerPerson(result);
    }
  }, [
    bill,
    tip,
    people,
    splitUnevenly,
    customAmounts,
    roundUp,
    currency,
    totalWithTip,
  ]);

  // Generate the result text - memoized with useCallback
  const getResultText = useCallback(() => {
    if (splitUnevenly && customError === "") {
      return customAmounts
        .map(
          (amt, idx) =>
            `Person ${idx + 1}: ${currency}${Number(amt).toFixed(2)}`
        )
        .join("\n");
    }
    return `Each person pays: ${currency}${perPerson.toFixed(2)}`;
  }, [splitUnevenly, customError, customAmounts, currency, perPerson]);

  // Copy result to clipboard
  const handleCopy = useCallback(() => {
    const text = getResultText();
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage("Copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    });
  }, [getResultText]);

  // Share result using native share API
  const handleShare = useCallback(() => {
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
  }, [getResultText]);

  return (
    <Wrapper>
      {/* Theme toggle button */}
      <div style={{ position: "absolute", top: 10, right: 0 }}>
        <ToggleContainer>
          <ToggleButton onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? <FiMoon size={18} /> : <FiSun size={18} />}
          </ToggleButton>
        </ToggleContainer>
      </div>

      <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        Split Bill Calculator
      </h2>

      {/* Currency selector */}
      <Label>Currency:</Label>
      <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="₹">INR (₹)</option>
        <option value="$">USD ($)</option>
        <option value="€">EUR (€)</option>
        <option value="£">GBP (£)</option>
      </Select>

      {/* Bill & tip inputs */}
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

      {/* Checkboxes for options */}
      <Row>
        <Checkbox>
          <input
            type="checkbox"
            checked={splitUnevenly}
            onChange={() => setSplitUnevenly(!splitUnevenly)}
          />
          Split Unevenly?
        </Checkbox>

        <Checkbox>
          <input
            type="checkbox"
            checked={roundUp}
            onChange={() => setRoundUp(!roundUp)}
          />
          Round up per person?
        </Checkbox>
      </Row>

      {/* Result Section */}
      {splitUnevenly ? (
        <>
          <Section>
            <h4>Custom Amounts:</h4>
            {Array.from({ length: Number(people) }, (_, idx) => (
              <InputField
                key={idx}
                label={`Person ${idx + 1}`}
                type="number"
                value={customAmounts[idx] || ""}
                onChange={(e) => {
                  const updated = [...customAmounts];
                  updated[idx] = e.target.value;
                  setCustomAmounts(updated);
                }}
                prefix={currency}
                placeholder="Enter amount"
              />
            ))}
          </Section>

          {/* ✅ Show result only if all inputs are valid */}
          {customError === "" && customAmounts.every((amt) => amt !== "") && (
            <Section>
              <h4>Result:</h4>
              {customAmounts.map((amt, idx) => (
                <p key={idx}>
                  Person {idx + 1}: {currency}
                  {Number(amt || 0).toFixed(2)}
                </p>
              ))}
            </Section>
          )}
        </>
      ) : (
        <ResultDisplay
          perPerson={perPerson}
          currency={currency}
          roundUp={roundUp}
        />
      )}

      {/* Copy & Share Buttons */}
      <ButtonGroup>
        <Button onClick={handleCopy}>
          <FiCopy size={18} />
          Copy
        </Button>
        <Button onClick={handleShare}>
          <FiShare2 size={18} />
          Share
        </Button>
      </ButtonGroup>

      {/* Messages */}
      {copyMessage && <Message>{copyMessage}</Message>}
      {customError && <Message error>{customError}</Message>}
    </Wrapper>
  );
};

export default Calculator;
