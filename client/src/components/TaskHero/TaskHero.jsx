import Task from "../../assets/images/Task.png";
import "./TaskHero.scss";
import React, { useState, useEffect, useRef } from "react";

const TaskHero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username, setUsername] = useState("Username");
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handlePlayMusic = () => {
    setShowPlayer(!showPlayer);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="hero">
      <section
        className="hero__logo"
        onClick={handlePlayMusic}
        style={{ cursor: "pointer" }}
      >
        <img src={Task} alt="hero icon" className="hero__icon" />
      </section>
      <section className="hero__content">
        <h3 className="hero__title">HELLO:&nbsp;
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="inline-username-input"
          />
        </h3>
        <p className="hero__date"> {formatDate(currentTime)}</p>
        <p className="hero__time"> {formatTime(currentTime)}</p>
      </section>
      {showPlayer && (
        <iframe
          width="30%"
          height="70%"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/723691396&color=%237c5e74&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
          style={{ border: "none", marginTop: "10px" }}
        ></iframe>
        
      )}
    </header>
  );
};

export default TaskHero;
