
import socket from "@/services/scoket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Notification = {
  _id?: string;
  id?: string;
  senderName?: string;
  senderId?: { username?: string };
  text?: string;
  createdAt?: string;
};

const NotificationDash = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { user, isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string };
      };
    }) => state.auth
  );

  useEffect(() => {
    if (user) {
      // Register user with socket
      socket.emit("register", user._id);

      // Load past notifications from DB
      fetch(`http://localhost:5000/api/notifications/${user._id}`)
        .then((res) => res.json())
        .then(setNotifications)
        .catch((err) => console.error("Failed to load notifications:", err));

      // Listen for new notifications in real-time
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [data, ...prev]); // add new at top
      });

      return () => {
        socket.off("getNotification");
      };
    }
  }, [user, isAuthenticated]);


  return (
    <div>
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
        <div className="divide-y divide-gray-200">
          {Array.isArray(notifications) &&
            notifications.map((activity: Notification) => (
              <div
                key={activity._id || activity.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${activity.senderName || activity.senderId?.username}`}
                    alt={activity.senderName || activity.senderId?.username || "Notification Avatar"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">
                          {activity.senderName || activity.senderId?.username}:{" "}
                        </span>
                        <span>{activity.text}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDash;
