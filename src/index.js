import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BondMessage from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='container'>
    <BondMessage message="Test" />
    </div>
    <BondInput></BondInput>
  </React.StrictMode>
);

function BondInput() {

  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = async (event) => {

    
    if (event.key === 'Enter') {
      // Function triggered when Enter key is pressed
      console.log('Enter key pressed! Input Value:');
      const body = {"sentence": inputValue};
      const requestOptions = {
        method: "POST",  // HTTP method
        headers: {
          "Content-Type": "application/json",  // Content type header
        },
        body: JSON.stringify(body),  // Convert data to JSON string
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/", requestOptions);
        const responseJson = await response.json()
        console.log(responseJson)
        setInputValue('');
      } catch (err) {
        console.warn("test")
      }
      // You can perform any action here, e.g., form submission, API call, etc.
      // Optionally, clear the input after pressing Enter
      
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input id="bondTalk" type="text" 
    value={inputValue}
    onKeyDown={handleKeyPress}
    onChange={handleInputChange}
    ></input>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
