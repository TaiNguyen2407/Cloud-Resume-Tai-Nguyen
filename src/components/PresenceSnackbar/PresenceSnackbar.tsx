import React, { useEffect, useState } from "react";
import "./PresenceSnackbar.css"

interface PresenceSnackbarProps {
  message: string;
  duration?: number;
}

const PresenceSnackbar: React.FC<PresenceSnackbarProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  return (
    <div className={`presence-snackbar ${visible ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default PresenceSnackbar;
