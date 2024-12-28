import React, { useState, useRef, useEffect, useCallback } from 'react';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const passwordRef = useRef();

  // Memoized password generator function
  const generatePassword = useCallback(() => {
    const numbers = '0123456789';
    const chars = '!@#$%^&*()_+{}[]|:;<>,.?/~`';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let characterPool = letters;
    if (numberAllowed) characterPool += numbers;
    if (charAllowed) characterPool += chars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, numberAllowed, charAllowed]);

  // Automatically generate a password whenever settings change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Copy to clipboard function
  const copyPasswordToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert('Password copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 my-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Header */}
      <h1 className="text-center text-3xl font-bold mb-6 drop-shadow-lg">
        🔐 Password Generator
      </h1>

      {/* Password Display */}
      <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-white text-gray-800">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 text-lg bg-transparent"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700 transition duration-200"
        >
          Copy
        </button>
      </div>

      {/* Settings */}
      <div className="bg-white/10 p-4 rounded-lg text-sm space-y-4">
        {/* Length Slider */}
        <div className="flex items-center justify-between">
          <label className="font-medium">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer w-3/4 accent-purple-500"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        {/* Checkboxes */}
        <div className="flex justify-between gap-4">
          {/* Numbers */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              className="accent-purple-500"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="font-medium">
              Include Numbers
            </label>
          </div>

          {/* Characters */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              className="accent-purple-500"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="font-medium">
              Include Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
