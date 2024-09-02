import React from 'react';

const Chatbox = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, margin: '20px', zIndex: 1000 }}>
      <iframe
        height="430"
        width="350"
        src="https://bot.dialogflow.com/52d79bca-b979-4891-93ec-4d05c4a88509"
        style={{ border: 'none' }}
        allow="microphone"
      >
        {/* Provide fallback content if iframe does not load */}
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};

export default Chatbox;
