// import React from 'react';

// const CashFlow = () => {
//   return (
//     <div>
//       <h1>Cash Flow Page</h1>
//       <p>This is the Cash Flow page.</p>
//     </div>
//   );
// };

// export default CashFlow;

import React, { useState, useEffect } from 'react';

const CashFlow = () => {
  const [inputData, setInputData] = useState('');

  // Retrieve data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('inputData');
    if (savedData) {
      setInputData(savedData);
    }
  }, []);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleSaveData = () => {
    localStorage.setItem('inputData', inputData);
  };

  return (
    <div>
      <h2>Enter Some Data:</h2>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <button onClick={handleSaveData}>Save</button>
      <div>
        <h3>Saved Data: {inputData}</h3>
      </div>
    </div>
  );
};

export default CashFlow;
