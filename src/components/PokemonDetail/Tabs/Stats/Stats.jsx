import React from "react";
import "./Stats.css";

const Stats = ({ stats, currentColor }) => {
  const statsContent = [
    { title: "HP", field: "hp" },
    { title: "Attack", field: "attack" },
    { title: "Defense", field: "defense" },
    { title: "Special Attack", field: "specialAttack" },
    { title: "Special Defense", field: "specialDefense" },
    { title: "Speed", field: "speed" },
  ];

  return (
    <div className="stats">
      {statsContent &&
        statsContent.map((stat, index) => (
          <div className="row" key={stat.field}>
            <strong>{stat.title}</strong>
            <span>{stats[index].base_stat || 1}</span>
            <div className="bar-status">
              <span
                style={{
                  width:
                    stats[index].base_stat <= 100
                      ? `${stats[index].base_stat}%`
                      : `100%`,
                  background: `${currentColor}`,
                }}
              />
            </div>
            <span>100</span>
          </div>
        ))}
    </div>
  );
};
export default Stats;