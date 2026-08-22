import { useState } from "react";
import { powerTools } from "./data";
import { FlipCard } from "./FlipCard";
import { Session } from "./Session";
import "./App.css";

type View = { kind: "home" } | { kind: "session" };

function App() {
  const [view, setView] = useState<View>({ kind: "home" });

  if (view.kind === "session") {
    return <Session onBack={() => setView({ kind: "home" })} />;
  }

  return (
    <>
      <header className="header">
        <h1>
          <span className="flip">flip</span>
          <span className="it">IT.</span>
        </h1>
        <p className="tagline">
          A coaching framework for shifting perspectives
        </p>
        <p className="subtitle">
          Find It &middot; Feel It &middot; Frame It &middot; Flip It
        </p>
      </header>

      <div className="card-grid">
        {powerTools.map((tool) => (
          <FlipCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="start-session-wrap">
        <button
          className="btn-start"
          onClick={() => setView({ kind: "session" })}
        >
          Start a Coaching Session
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </>
  );
}

export default App;
