import React, {use, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BondMessage from './components/BondMessages/BondMessage';
import BondInput from './components/BondInput/BondInput';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BondContainer/>
  </React.StrictMode>
);

function BondContainer() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <div className='container'>
    {messages.map((message, index) => (
      <BondMessage key={index} message={message.message} input={message.input} ></BondMessage>
    ))}
    
    <BondInput setMessages={setMessages}></BondInput>
    </div>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
