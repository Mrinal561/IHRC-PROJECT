import React, { useEffect, useRef, useState } from 'react';

const messages = [
  "Subham Dsc expired on PF portal",
  "E-Sign inactive of Subham on PF portal",
  "Documents to be uploaded in PF tracker",
  "PF due date is near please upload adequate documents"
];

const MessageTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [tickerWidth, setTickerWidth] = useState(0);

  useEffect(() => {
    if (tickerRef.current) {
      const totalWidth = Array.from(tickerRef.current.children).reduce(
        (acc, child) => acc + (child as HTMLElement).offsetWidth,
        0
      );
      setTickerWidth(totalWidth);
    }
  }, []);

  return (
    <div className="bg-indigo-400 p-2 text-sm font-semibold text-white overflow-hidden">
      <div
        className="whitespace-nowrap"
        style={{
          animation: `scroll ${tickerWidth / 50}s linear infinite`,
        }}
        ref={tickerRef}
      >
        {messages.map((message, index) => (
          <span key={index} className="mx-4">
            {message}
          </span>
        ))}
        {/* Duplicate messages to create a seamless loop */}
        {messages.map((message, index) => (
          <span key={`${index}-duplicate`} className="mx-4">
            {message}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-${tickerWidth}px); }
        }
      `}</style>
    </div>
  );
};

export default MessageTicker;