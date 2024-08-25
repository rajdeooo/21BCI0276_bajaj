import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await fetch('http://localhost:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      alert('Invalid JSON or error in API call');
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    let result = [];
    if (selectedOptions.includes('Numbers')) {
      result.push(<p>Numbers: {responseData.numbers ? responseData.numbers.join(', ') : 'N/A'}</p>);
    }
    if (selectedOptions.includes('Alphabets')) {
      result.push(<p>Alphabets: {responseData.alphabets ? responseData.alphabets.join(', ') : 'N/A'}</p>);
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      result.push(<p>Highest lowercase alphabet: {responseData.highest_lowercase_alphabet ? responseData.highest_lowercase_alphabet.join(', ') : 'N/A'}</p>);
    }
    return result;
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea 
        rows="5" 
        cols="40" 
        placeholder="Enter JSON data here..." 
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      {Object.keys(responseData).length > 0 && (
        <>
          <select multiple={true} onChange={handleSelectChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <div>{renderResponse()}</div>
        </>
      )}
    </div>
  );
}

export default App;