import localFont from "next/font/local";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { TTSProvider } from "@/contexts/tts";

const inter = localFont({
  src: "../fonts/inter-roman.var.woff2",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --inter-font: ${inter.style.fontFamily};
        }
      `}</style>
      <ThemeProvider>
        <TTSProvider>
          <Component {...pageProps} />
        </TTSProvider>
      </ThemeProvider>
    </>
  );
}
