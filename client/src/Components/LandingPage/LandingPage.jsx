import React from "react";
import "./LandingPage.css";
import Philo from "../../assets/philo_icons.svg";

export default function LandingPage() {
  return (
    <div className="main-wrapper">
      <div className="titles">
        <div className="main-title">Codagora,</div>
        <div className="subtitle">where code is debated.</div>
      </div>
      <div className="icons">
        <img src={Philo} alt="Philo" />
      </div>
    </div>
  );
}
