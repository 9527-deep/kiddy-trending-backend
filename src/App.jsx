import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [trending, setTrending] = useState([]);
  const [viral, setViral] = useState([]);
  const [activeTab, setActiveTab] = useState("trending");
  const API_BASE = process.env.REACT_APP_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    axios.get(API_BASE + "/api/trending").then((res) => {
      setTrending(res.data.videos);
    });
    axios.get(API_BASE + "/api/viral").then((res) => {
      setViral(res.data.videos);
    });
  }, [API_BASE]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>YouTube Trending for Kids</h1>
      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setActiveTab("trending")}>
          Show Trending
        </button>
        <button onClick={() => setActiveTab("viral")} style={{ marginLeft: "10px" }}>
          Show Viral
        </button>
      </div>
      <div>
        {activeTab === "trending" && trending.map((v, i) => (
          <div key={i} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc" }}>
            <h3>{v.title}</h3>
            <p>Channel: {v.channel}</p>
            <p>Views: {v.views} Likes: {v.likes}</p>
            <a href={v.video_url} target="_blank" rel="noreferrer">Watch</a>
          </div>
        ))}
        {activeTab === "viral" && viral.map((v, i) => (
          <div key={i} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc" }}>
            <h3>{v.title}</h3>
            <p>Channel: {v.channel}</p>
            <p>Views: {v.views} Likes: {v.likes}</p>
            <p>Followers: {v.followers} Ratio: {Math.round(v.multiplier)}x</p>
            <a href={v.video_url} target="_blank" rel="noreferrer">Watch</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
