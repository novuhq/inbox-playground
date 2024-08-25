import { useState, useEffect } from "react";

export const useDesignDashboard = () => {
  const [showDesignDashboard, setShowDesignDashboard] = useState(false);

  useEffect(() => {
    const savedValue = window?.localStorage.getItem("showDesignDashboard");
    setShowDesignDashboard(savedValue !== null ? JSON.parse(savedValue) : false);
  }, []);

  const handleToggleDesignDashboard = () => {
    setShowDesignDashboard((prevValue: boolean) => {
      const newValue = !prevValue;
      localStorage.setItem("showDesignDashboard", JSON.stringify(newValue));
      return newValue;
    });
  };

  return { showDesignDashboard, handleToggleDesignDashboard };
};