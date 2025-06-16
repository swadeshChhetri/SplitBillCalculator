import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import Calculator from './components/Calculator';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <button onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <Calculator />
    </ThemeProvider>
  );
}

export default App;

