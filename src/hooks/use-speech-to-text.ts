import { useEffect, useState, useCallback } from "react";

const _useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  let recognition: any = null;

  useEffect(() => {
    const initializeRecognition = () => {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        recognition = new ((window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition ||
          (window as any).mozSpeechRecognition ||
          (window as any).msSpeechRecognition)();

        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const currentTranscript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += currentTranscript + " ";
            } else {
              interimTranscript += currentTranscript;
            }
          }

          setTranscript((previousTranscript) => {
            return previousTranscript + " " + finalTranscript;
          });
        };

        recognition.onend = () => {
          setIsListening(false);
          recognition = null;
        };
      } catch (error) {
        setError("Speech recognition is not supported in this browser.");
      }
    };

    initializeRecognition();

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, error, startListening, stopListening };
};

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

const useSpeechToText = (): {
  startRecognition: () => void;
  stopRecognition: () => void;
  transcript: string | null;
} => {
  const [speechRecognition, setSpeechRecognition] = useState<any | null>(null);
  const [transcript, setTranscript] = useState("");

  const handleSpeechResult = (event: any) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const currentTranscript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += currentTranscript + " ";
      } else {
        interimTranscript += currentTranscript;
      }
    }

    console.log(transcript);

    setTranscript((previousTranscript) => {
      return previousTranscript + " " + finalTranscript;
    });
  };

  const startRecognition = useCallback(() => {
    if (!speechRecognition) {
      const recognition = new ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = handleSpeechResult;
      setSpeechRecognition(recognition);
    }

    if (speechRecognition) {
      speechRecognition.start();
    }
  }, [speechRecognition]);

  const stopRecognition = useCallback(() => {
    if (speechRecognition) {
      speechRecognition.stop();
      setTranscript("");
    }
  }, [speechRecognition]);

  useEffect(() => {
    return () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, [speechRecognition]);

  return {
    startRecognition,
    stopRecognition,
    transcript,
  };
};

export default useSpeechToText;
