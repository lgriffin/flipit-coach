import { useState } from "react";
import type { PowerTool } from "./data";

export function FlipCard({ tool }: { tool: PowerTool }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      aria-label={`${tool.stuck.name} vs ${tool.flipped.name}. Click to flip.`}
    >
      <div className="flip-card-inner">
        {/* Stuck side */}
        <div className="flip-card-front">
          <h3 style={{ color: tool.color }}>{tool.stuck.name}</h3>
          <span className="card-type">{tool.stuck.type}</span>
          <span className="card-def">{tool.stuck.definition}</span>
          <div
            className="flip-card-corner"
            style={{ background: tool.color }}
          />
          <span className="flip-hint">click to flip</span>
        </div>

        {/* Empowered side */}
        <div className="flip-card-back" style={{ background: tool.color }}>
          <h3>{tool.flipped.name}</h3>
          <span className="card-type">{tool.flipped.type}</span>
          <span className="card-def">{tool.flipped.definition}</span>
        </div>
      </div>
    </div>
  );
}
