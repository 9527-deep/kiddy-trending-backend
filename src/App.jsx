import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [trending, setTrending] = useState([]);
  const [viral, setViral] = useState([]);
  const [activeTab, setActiveTab] = useState("trending");
  const API = process.env.REACT_APP_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    axios.get(API + "/api/trending").then((res) => setTrending(res.data.videos));
    axios.get(API + "/api/viral").then((res) => setViral(res.data.videos));
  }, [API]);

  const renderList = (list) => (
    <div>
      {list.map((v, i) => (
        <div key={i} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd" }}>
          <h3>{v.title}</h3>
          <p>Channel: {v.channel}</p>
          <p>Views: {v.views} Likes: {v.likes}</p>
          {v.followers && <p>Followers: {v.followers} Ratio: {Math.round(v.multiplier)}x</p>}
          <a href={v.video_url} target="_blank" rel="noreferrer">Watch</a>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>YouTube Kids Hotlist</h1>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setActiveTab("trending")}>Trending</button>
        <button onClick={() => setActiveTab("viral")} style={{ marginLeft: "10px" }}>Viral</button>
      </div>
      {activeTab === "trending" ? renderList(trending) : renderList(viral)}
    </div>
  );
}

export default App;
