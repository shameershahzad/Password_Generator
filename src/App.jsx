import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      str += '0123456789';
    }

    if (charAllowed) {
      str += '!@#$%^&<>?`~-_=+[]{}';
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
    passwordRef.current?.blur(); // Removes focus after copying
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const changeLength = (e) => {
    setLength(e.target.value);
  };

  const changenumberAllowed = () => {
    setnumberAllowed((prev) => !prev);
  };

  const changecharAllowed = () => {
    setcharAllowed((prev) => !prev);
  };

  return (
    <>
      <div
        style={{
          height: '160px',
          width: '600px',
          backgroundColor: 'darkslategray',
          borderRadius: '10px',
          margin: 'auto',
          padding: '10px',
        }}
      >
        <div>
          <h1 style={{ color: 'white', textAlign: 'center', fontSize: '25px' }}>
            Password Generator
          </h1>
          <input
            style={{
              height: '30px',
              width: '500px',
              border: 'none',
              borderRadius: '10px',
              marginLeft: '28px',
              outline: 'none', // Removes focus border
            }}
            type="text"
            value={Password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoClipboard}
            style={{
              height: '30px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
          >
            Copy
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ marginRight: '20px' }}>
            <input
              style={{ cursor: 'pointer' }}
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={changeLength}
            />
            <label
              style={{
                fontSize: '20px',
                color: 'yellow',
                marginLeft: '10px',
              }}
            >
              Length: {length}
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <input
              style={{ cursor: 'pointer' }}
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={changenumberAllowed}
            />
            <label
              htmlFor="numberInput"
              style={{
                fontSize: '20px',
                color: 'yellow',
                marginLeft: '5px',
              }}
            >
              Number
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              style={{ cursor: 'pointer' }}
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={changecharAllowed}
            />
            <label
              htmlFor="charInput"
              style={{
                fontSize: '20px',
                color: 'yellow',
                marginLeft: '5px',
              }}
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
