import React from "react";

const Sidebar = () => {
  const openGeminiChat = () => {
    window.open("https://gemini.google.com/", "_blank");
  };
  const openMongoDBFaq = () => {
    window.open(
      "https://cloud.mongodb.com/v2/67b0407dd5624d4d73e9a398#/metrics/replicaSet/67b04187a3eb020a2f7c1571/explorer/test/faqs/find"
    );
  };

  return (
    <div className="sidebar">
      <h2>Options</h2>
      <ul>
        <li onClick={openMongoDBFaq}>FAQs</li>
        <li>Settings</li>
        <li onClick={openGeminiChat}>Help</li>
      </ul>
    </div>
  );
};

export default Sidebar;
