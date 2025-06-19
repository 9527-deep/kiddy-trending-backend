import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [trending, setTrending] = useState([]);
  const [viral, setViral] = useState([]);
  const [activeTab, setActiveTab] = useState("trending");
  const API_BASE = process.env.REACT_APP_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/api/trending`).then((res) => {
      setTrending(res.data.videos);
    });
    axios.get(`${API_BASE}/api/viral`).then((res) => {
      setViral(res.data.videos);
    });
  }, [API_BASE]);

  const renderTrending = () => (
    <div className="space-y-4">
      {trending.map((video, index) => (
        <div key={index} className="bg-white shadow rounded p-4">
          <h3 className="font-bold text-lg mb-1">{video.title}</h3>
          <p className="text-sm text-gray-600">Channel: {video.channel}</p>
          <p className="text-sm">Views: {video.views.toLocaleString()} Likes: {video.likes.toLocaleString()}</p>
          <p className="text-sm">Tags: {video.tags?.join(", ")}</p>
          <a href={video.video_url} className="text-blue-500 text-sm" target="_blank" rel="noreferrer">Watch</a>
        </div>
      ))}
    </div>
  );

  const renderViral = () => (
    <div className="space-y-4">
      {viral.map((video, index) => (
        <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow rounded">
          <h3 className="font-bold text-lg mb-1">{video.title}</h3>
          <p className="text-sm text-gray-700">Channel: {video.channel}</p>
          <p className="text-sm">Views: {video.views.toLocaleString()} Likes: {video.likes.toLocaleString()}</p>
          <p className="text-sm">Followers: {video.followers?.toLocaleString()} Ratio: {Math.round(video.multiplier)}x</p>
          <a href={video.video_url} className="text-blue-600 text-sm" target="_blank" rel="noreferrer">Watch</a>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow p-4 text-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold">YouTube Trending for Kids</h1>
      </header>
      <main className="flex-1 px-4 py-2 max-w-screen-sm w-full mx-auto">
        {activeTab === "trending" && renderTrending()}
        {activeTab === "viral" && renderViral()}
      </main>
      <nav className="bg-white shadow-inner border-t border-gray-200 flex justify-around py-2 sticky bottom-0 z-10">
        <button className={\`text-sm font-semibold \${activeTab === "trending" ? "text-blue-600" : "text-gray-500"}\`} onClick={() => setActiveTab("trending")}>Trending</button>
        <button className={\`text-sm font-semibold \${activeTab === "viral" ? "text-blue-600" : "text-gray-500"}\`} onClick={() => setActiveTab("viral")}>Viral</button>
      </nav>
    </div>
  );
}

export default App;
