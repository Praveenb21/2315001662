import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  Type: string;
  Message: string;
  Timestamp: string;
}

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/priority-notifications")
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Priority Inbox (Top 10)</h1>

      {notifications.map((n, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>
            {index + 1}. {n.Type}
          </h3>

          <p>{n.Message}</p>

          <small>{n.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
