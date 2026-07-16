import { useEffect, useState } from "react";
import type { StopQuote } from "../i18n/types";

interface StopQuoteBlockProps {
  quote: StopQuote;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function StopQuoteBlock({ quote }: StopQuoteBlockProps) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(quote.text);
      setDone(true);
      return;
    }

    setShown("");
    setDone(false);
    let i = 0;
    const text = quote.text;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 26);

    return () => window.clearInterval(id);
  }, [quote.text]);

  return (
    <blockquote className="stop-quote">
      <p className="stop-quote__text stop-quote__text--type">
        „{shown}
        {!done && <span className="stop-quote__caret" aria-hidden />}
        "
      </p>
      <footer
        className={`stop-quote__attr meta-mono ${done ? "stop-quote__attr--visible" : ""}`}
      >
        — {quote.attribution}
      </footer>
    </blockquote>
  );
}
