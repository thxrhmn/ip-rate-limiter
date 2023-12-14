const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Middleware untuk melihat IP address
app.use((req, res, next) => {
  const clientIP = req.ip; // Mengambil IP address user
  console.log(`Client dengan IP address ${clientIP} mengakses API.`);
  next();
});

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 hari
  max: 5, // Maksimal 5 request
  message: (req, res) => {
    res.status(429).json({
      code: 429,
      status: "error",
      message:
        "Batas permintaan harian Anda telah tercapai. Silakan coba lagi besok.",
    });
  },
});

// Menggunakan rate limiter middleware
app.use(limiter);

app.get("/api/data", (req, res) => {
  const clientIP = req.ip;
  res.json({
    message: "Ini adalah contoh data dari API. ini IP anda: " + clientIP,
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
