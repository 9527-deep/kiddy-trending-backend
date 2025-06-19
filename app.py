from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtube_api import fetch_trending_videos, identify_viral_videos

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/trending")
def get_trending():
    videos = fetch_trending_videos(region="US", max_results=10)
    return {"platform": "YouTube", "videos": videos}

@app.get("/api/viral")
def get_viral():
    trending = fetch_trending_videos(region="US", max_results=15)
    viral = identify_viral_videos(trending)
    return {"platform": "YouTube", "videos": viral}
