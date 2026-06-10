import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

function getWeight(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}

app.get("/priority-notifications", async (req, res) => {
  try {
    // Get Token
    const authResponse = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: process.env.EMAIL,
        name: process.env.NAME,
        rollNo: process.env.ROLLNO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
    );

    const token = authResponse.data.access_token;

    // Fetch Notifications
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const notifications = response.data.notifications;

    notifications.forEach((n) => {
      const weight = getWeight(n.Type);
      const timestamp = new Date(n.Timestamp).getTime();

      n.score = weight * 10000000000000 + timestamp;
    });

    notifications.sort((a, b) => b.score - a.score);

    res.json(notifications.slice(0, 10));
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Error fetching notifications",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
