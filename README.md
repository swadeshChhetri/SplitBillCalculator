# 💸 Split Bill Calculator

A smart and customizable bill splitting calculator built with **React** and **styled-components**. It allows users to evenly or unevenly divide a bill among people, with options for tipping, rounding up, and multi-currency support.

---

## 🚀 Features

### ✅ Core Functionalities
- 💰 **Split Bill** evenly or manually between multiple people.
- 💸 **Add Tip** using predefined or custom percentage.
- 💱 **Select Currency**: INR (₹), USD ($), EUR (€), GBP (£).

### 🎯 Customizations
- 🔢 **Round Up** per-person share to the nearest whole number.
- 🧍 **Split Unevenly**: Input individual amounts per person.
- 📋 **Copy to Clipboard** the final result.
- 📤 **Share Result** via supported mobile/web sharing.

### 🌙 Theming
- 🌗 **Light/Dark Mode** toggle with smooth UI transitions.

### ⚙️ Validations
- Ensures inputs are valid numbers.
- Prevents splitting by zero people.
- Warns if custom split doesn’t match the total.

---

## 🛠️ Technologies Used

- **React** (with Hooks)
- **Styled-components**
- **React Icons** (Feather Icons)
- **JavaScript (ES6+)**
- **CSS Animations**

---

## 📁 Folder Structure

src/
│
├── components/
│ ├── Calculator.js # Main calculator logic and layout
│ ├── InputField.js # Reusable input field with prefix
│ ├── TipSelector.js # Tip percentage buttons + input
│ └── ResultDisplay.js # Per-person result display
│
├── utils/
│ ├── calculateSplit.js # Helper function to compute split
│ └── validateInput.js # Input validation logic
│
├── themes/
│ └── theme.js # Light and dark theme definitions
│
└── App.js # Main App wrapper

yaml
Copy
Edit

---

## 📸 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![light](./screenshots/light-mode.png) | ![dark](./screenshots/dark-mode.png) |

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/split-bill-calculator.git
cd split-bill-calculator