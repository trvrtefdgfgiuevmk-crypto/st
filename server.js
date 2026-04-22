const express = require("express");
const fetch = require("node-fetch");

const app = express();

const API_KEY = "COLOCA_SUA_KEY_AQUI";

app.get("/user/:username", async (req, res) => {
  try {
    const r = await fetch(
      `https://tiktok-scraper7.p.rapidapi.com/user/info?unique_id=${req.params.username}`,
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "tiktok-scraper7.p.rapidapi.com"
        }
      }
    );

    const data = await r.json();

    res.json({
      username: data.data.user.nickname,
      bio: data.data.user.signature,
      followers: data.data.stats.followerCount,
      following: data.data.stats.followingCount,
      likes: data.data.stats.heartCount,
      videos: data.data.stats.videoCount
    });

  } catch {
    res.status(500).json({ error: "erro" });
  }
});

app.listen(3000);
