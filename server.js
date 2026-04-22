const express = require("express");
const fetch = require("node-fetch");

const app = express();

const API_KEY = "28835845eamsh938770a2b856eb4p142a75jsn547fc3959c2e";

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

    const text = await r.text(); // 👈 pega resposta crua
    console.log("RESPOSTA API:", text); // 👈 mostra no Render logs

    const data = JSON.parse(text);

    if (!data || !data.data) {
      return res.json({ error: "API respondeu errado", raw: text });
    }

    res.json({
      username: data.data.user?.nickname || "N/A",
      bio: data.data.user?.signature || "N/A",
      followers: data.data.stats?.followerCount || 0,
      following: data.data.stats?.followingCount || 0,
      likes: data.data.stats?.heartCount || 0,
      videos: data.data.stats?.videoCount || 0,
      avatar: data.data.user?.avatarLarger || ""
    });

  } catch (err) {
    console.log("ERRO REAL:", err);
    res.json({ error: "erro real", details: err.toString() });
  }
});

app.listen(3000);
