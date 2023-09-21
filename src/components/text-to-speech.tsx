import useTextToSpeech from "@/hooks/use-text-to-speech";
import React, { useState } from "react";

const TextToSpeech = () => {
  const { voices, selectedVoice, setVoice, speak } = useTextToSpeech();
  const [text, setText] = useState("");

  const handleVoiceChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setVoice(event.target.value);
  };

  const handleSpeak = () => {
    if (text) {
      speak(text);
    }
  };

  return (
    <div>
      <h1>Text to Speech App</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Enter text to speak..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <label htmlFor="voices">Select a voice:</label>
      <select
        id="voices"
        onChange={handleVoiceChange}
        value={selectedVoice ? selectedVoice.name : ""}
      >
        {voices.map((voice, i) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
