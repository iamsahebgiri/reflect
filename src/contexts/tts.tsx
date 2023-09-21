import React, { createContext, useEffect, useState } from "react";

interface ContextType {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setVoice: (voiceName: string) => void;
  speak: (text: string) => void;
}

export const TTSContext = createContext<ContextType>({
  voices: [],
  selectedVoice: null,
  setVoice: () => {},
  speak: () => {},
});

interface TTSProviderProps {
  children: React.ReactNode;
}

export const TTSProvider = ({ children }: TTSProviderProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0 && selectedVoice === null) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    fetchVoices();
    window.speechSynthesis.onvoiceschanged = fetchVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const setVoice = (voiceName: string) => {
    const selected = voices.find((voice) => voice.name === voiceName);
    if (selected) {
      setSelectedVoice(selected);
    }
  };

  return (
    <TTSContext.Provider
      value={{
        voices,
        selectedVoice,
        setVoice,
        speak,
      }}
    >
      {children}
    </TTSContext.Provider>
  );
};
