import { TTSContext } from "@/contexts/tts";
import { useCallback, useContext, useEffect, useState } from "react";

const _useTextToSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }

      console.log("Fetching voices...", availableVoices.length);
    };

    fetchVoices();
    window.speechSynthesis.onvoiceschanged = fetchVoices;

    return () => {
      console.log("unmount");
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

  return { voices, selectedVoice, setVoice, speak };
};

const useTextToSpeech = () => {
  const ttsContextData = useContext(TTSContext);
  return ttsContextData;
};

export default useTextToSpeech;
