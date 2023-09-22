import useSpeechToText from "@/hooks/use-speech-to-text";
import { useThoughts } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from "react";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export interface TextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  id?: string;
}

const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ value, setValue, id, ...props }, ref) => {
    const { add, edit } = useThoughts();
    const [isListening, setListening] = useState(false);
    const { startRecognition, stopRecognition, transcript } = useSpeechToText();
    const textAreaRef = useRef<HTMLTextAreaElement>();
    // const [isHovered, setHovered] = useState<boolean>(false);

    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
      updateTextAreaSize(textArea);
      textAreaRef.current = textArea;
    }, []);

    useIsomorphicLayoutEffect(() => {
      updateTextAreaSize(textAreaRef.current);
    }, [value]);

    const saveThought = () => {
      if (value && value.toString().length > 0) {
        if (id) {
          edit(id, value.toString());
        } else {
          add(value.toString());
        }
      }
      setValue("");
    };

    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-title">Today</h1>
        <div>
          <div
            className="relative"
            // onMouseEnter={() => {
            //   setHovered(true);
            // }}
            // onMouseLeave={() => {
            //   setHovered(false);
            // }}
          >
            <textarea
              ref={inputRef}
              style={{ height: 0 }}
              value={value}
              onChange={(e) => {
                // if (e.target.value !== "\n") setValue(e.target.value);
                setValue(e.target.value);
              }}
              title="Click outside the textarea to save your thought."
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     saveThought();
              //   }
              // }}
              onBlur={() => {
                saveThought();
              }}
              className="flex-grow resize-none overflow-hidden pl-3 py-3 pr-12 outline-none w-full border-none focus:ring-0 bg-surface rounded-lg"
              placeholder="What's on your mind?"
              {...props}
            />

            <button
              className="absolute right-2 top-3 flex"
              onClick={() => {
                if (isListening) {
                  stopRecognition();
                  setListening(false);
                  console.log(transcript);
                  if (transcript) {
                    setValue(transcript.trim());
                  }
                } else {
                  startRecognition();
                  setListening(true);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600 h-6 w-6 z-10"
                viewBox="0 0 28 28"
              >
                <path
                  fill="currentColor"
                  d="M14 2a4.5 4.5 0 0 0-4.5 4.5v8a4.5 4.5 0 1 0 9 0v-8A4.5 4.5 0 0 0 14 2ZM7.5 13.75a.75.75 0 1 0-1.5 0v.75a8 8 0 0 0 7.25 7.965v2.785a.75.75 0 0 0 1.5 0v-2.785A8 8 0 0 0 22 14.5v-.75a.75.75 0 1 0-1.5 0v.75a6.5 6.5 0 1 1-13 0v-.75Z"
                />
              </svg>
              {isListening && (
                <span className="absolute p-1 right-0 inline-flex h-full w-full rounded-full bg-gray-400 opacity-75 animate-ping"></span>
              )}
            </button>
            {/* <AnimatePresence>
              {isHovered ? (
                <motion.div
                  layoutId="bubble"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-hover absolute inset-0 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                />
              ) : null}
            </AnimatePresence> */}
          </div>
          <div className="h-[1px] bg-border" />
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
