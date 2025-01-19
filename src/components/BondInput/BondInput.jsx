import './BondInput.css'
import { useState } from 'react';

function BondInput({setMessages}) {

  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = async (event) => {

    
    if (event.key === 'Enter') {
      // Function triggered when Enter key is pressed
      console.log('Enter key pressed! Input Value:' + inputValue);
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
        setMessages((messages) => [...messages, {message: responseJson['message'], input: inputValue}])
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
    <div className='inputContainer'>
    <input className='bondTalk' id="bondTalk" type="text" 
    value={inputValue}
    onKeyDown={handleKeyPress}
    onChange={handleInputChange}
    placeholder='Talk to James'
    ></input>
    </div>
  )
}

export default BondInput;