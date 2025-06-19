import requests
from typing import List, Dict
import os

YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY")
BASE_VIDEO_URL = "https://www.googleapis.com/youtube/v3"

def fetch_trending_videos(region="US", max_results=10) -> List[Dict]:
    url = f"{BASE_VIDEO_URL}/videos"
    params = {
        "part": "snippet,statistics",
        "chart": "mostPopular",
        "regionCode": region,
        "maxResults": max_results,
        "key": YOUTUBE_API_KEY
    }
    response = requests.get(url, params=params)
    items = response.json().get("items", [])
    results = []
    for item in items:
        results.append({
            "title": item["snippet"]["title"],
            "channel": item["snippet"]["channelTitle"],
            "views": int(item["statistics"].get("viewCount", 0)),
            "likes": int(item["statistics"].get("likeCount", 0)),
            "comments": int(item["statistics"].get("commentCount", 0)),
            "tags": item["snippet"].get("tags", []),
            "video_url": f"https://youtube.com/watch?v={item['id']}",
            "publish_date": item["snippet"]["publishedAt"][:10],
            "channelId": item["snippet"]["channelId"]
        })
    return results

def fetch_channel_subs(channel_id: str) -> int:
    url = f"{BASE_VIDEO_URL}/channels"
    params = {
        "part": "statistics",
        "id": channel_id,
        "key": YOUTUBE_API_KEY
    }
    r = requests.get(url, params=params)
    items = r.json().get("items", [])
    if items:
        return int(items[0]["statistics"].get("subscriberCount", 0))
    return 0

def identify_viral_videos(videos: List[Dict], multiplier_threshold=100) -> List[Dict]:
    viral = []
    for video in videos:
        channel_id = video.get("channelId")
        if not channel_id:
            continue
        subs = fetch_channel_subs(channel_id)
        if subs == 0:
            continue
        ratio = video["views"] / subs if subs else 0
        if ratio >= multiplier_threshold:
            viral.append({
                **video,
                "followers": subs,
                "multiplier": ratio
            })
    return viral
