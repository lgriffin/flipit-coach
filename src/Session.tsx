import { useState, useMemo } from "react";
import { powerTools } from "./data";
import type { PowerTool } from "./data";

const PHOTO_COUNT = 30;
const PHOTOS = Array.from(
  { length: PHOTO_COUNT },
  (_, i) => `/photos/flipit-${String(i + 1).padStart(2, "0")}.jpg`
);

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STEPS = ["Find It", "Feel It", "Frame It", "Flip It"] as const;
type Step = (typeof STEPS)[number];

interface PhotoCard {
  src: string;
  faceUp: boolean;
}

interface SessionState {
  step: Step;
  selectedTool: PowerTool | null;
  pickedFaceUp: number | null;
  pickedFaceDown: number | null;
  photosRevealed: boolean;
  notes: Record<string, string>;
}

export function Session({ onBack }: { onBack: () => void }) {
  const [sessionSeed] = useState(() => Math.floor(Math.random() * 2147483646) + 1);

  const photoCards: PhotoCard[] = useMemo(() => {
    const shuffled = seededShuffle(PHOTOS, sessionSeed);
    return shuffled.map((src, i) => ({
      src,
      faceUp: i < Math.floor(PHOTO_COUNT / 2),
    }));
  }, [sessionSeed]);

  const [state, setState] = useState<SessionState>({
    step: "Find It",
    selectedTool: null,
    pickedFaceUp: null,
    pickedFaceDown: null,
    photosRevealed: false,
    notes: {},
  });

  const stepIndex = STEPS.indexOf(state.step);

  function setNote(key: string, value: string) {
    setState((s) => ({ ...s, notes: { ...s.notes, [key]: value } }));
  }

  function nextStep() {
    if (stepIndex < STEPS.length - 1) {
      setState((s) => ({ ...s, step: STEPS[stepIndex + 1] }));
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setState((s) => ({ ...s, step: STEPS[stepIndex - 1] }));
    }
  }

  function reset() {
    setState({
      step: "Find It",
      selectedTool: null,
      pickedFaceUp: null,
      pickedFaceDown: null,
      photosRevealed: false,
      notes: {},
    });
  }

  function revealPhotos() {
    setState((s) => ({ ...s, photosRevealed: true }));
  }

  const tool = state.selectedTool;

  const canAdvance =
    state.step === "Find It"
      ? state.photosRevealed
      : state.step === "Feel It"
        ? tool !== null
        : true;

  const isWideStep = state.step === "Find It";

  return (
    <div className={`session${isWideStep ? " session-wide" : ""}`}>
      <button className="back-link" onClick={onBack}>
        &larr; Back to Power Tools
      </button>

      <div className="session-header">
        <h1>
          <span style={{ opacity: 0.5, fontWeight: 300 }}>flip</span>IT
          Session
        </h1>
      </div>

      <div className="session-steps">
        {STEPS.map((s, i) => (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            <div
              className={`step-indicator${
                i === stepIndex
                  ? " active"
                  : i < stepIndex
                    ? " completed"
                    : ""
              }`}
              style={
                i === stepIndex && tool
                  ? { background: tool.color }
                  : undefined
              }
            >
              {s}
            </div>
            {i < STEPS.length - 1 && (
              <span className="step-connector">&rsaquo;</span>
            )}
          </div>
        ))}
      </div>

      <div className="step-content" key={state.step}>
        {state.step === "Find It" && (
          <FindItStep
            cards={photoCards}
            pickedFaceUp={state.pickedFaceUp}
            pickedFaceDown={state.pickedFaceDown}
            revealed={state.photosRevealed}
            onPickFaceUp={(i) =>
              setState((s) => ({ ...s, pickedFaceUp: i }))
            }
            onPickFaceDown={(i) =>
              setState((s) => ({ ...s, pickedFaceDown: i }))
            }
            onReveal={revealPhotos}
            notes={state.notes}
            onNote={setNote}
          />
        )}
        {state.step === "Feel It" && (
          <FeelItStep
            cards={photoCards}
            pickedFaceUp={state.pickedFaceUp}
            pickedFaceDown={state.pickedFaceDown}
            selected={state.selectedTool}
            onSelect={(t) => setState((s) => ({ ...s, selectedTool: t }))}
            notes={state.notes}
            onNote={setNote}
          />
        )}
        {state.step === "Frame It" && tool && (
          <FrameItStep tool={tool} notes={state.notes} onNote={setNote} />
        )}
        {state.step === "Flip It" && tool && (
          <FlipItStep
            tool={tool}
            cards={photoCards}
            pickedFaceUp={state.pickedFaceUp}
            pickedFaceDown={state.pickedFaceDown}
            notes={state.notes}
            onNote={setNote}
            onNewSession={reset}
          />
        )}
      </div>

      {state.step !== "Flip It" && (
        <div className="step-nav">
          <button
            className="btn btn-secondary"
            onClick={prevStep}
            disabled={stepIndex === 0}
          >
            &larr; Back
          </button>
          <button
            className="btn btn-primary"
            style={{ background: tool?.color ?? "#555" }}
            onClick={nextStep}
            disabled={!canAdvance}
          >
            Continue &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── FIND IT ─── */

function FindItStep({
  cards,
  pickedFaceUp,
  pickedFaceDown,
  revealed,
  onPickFaceUp,
  onPickFaceDown,
  onReveal,
  notes,
  onNote,
}: {
  cards: PhotoCard[];
  pickedFaceUp: number | null;
  pickedFaceDown: number | null;
  revealed: boolean;
  onPickFaceUp: (i: number) => void;
  onPickFaceDown: (i: number) => void;
  onReveal: () => void;
  notes: Record<string, string>;
  onNote: (key: string, value: string) => void;
}) {
  const bothPicked = pickedFaceUp !== null && pickedFaceDown !== null;

  return (
    <>
      <h2>Find It</h2>
      <p className="step-subtitle">
        {!revealed
          ? "Ask your client to choose one face-up image that draws them, and one face-down card that calls to them. Then reveal both."
          : "Both cards are revealed. Explore what these images mean to your client and the challenge they represent."}
      </p>

      {!revealed && (
        <div className="pick-status">
          <span className={pickedFaceUp !== null ? "picked" : ""}>
            {pickedFaceUp !== null ? "Face-up card chosen" : "Pick a face-up card"}
          </span>
          <span className="pick-divider">&</span>
          <span className={pickedFaceDown !== null ? "picked" : ""}>
            {pickedFaceDown !== null
              ? "Face-down card chosen"
              : "Pick a face-down card"}
          </span>
        </div>
      )}

      {!revealed ? (
        <>
          <div className="photo-grid">
            {cards.map((card, i) => {
              const isFaceUp = card.faceUp;
              const isPickedUp = pickedFaceUp === i;
              const isPickedDown = pickedFaceDown === i;
              const isPicked = isPickedUp || isPickedDown;

              const dimmed =
                (isFaceUp && pickedFaceUp !== null && !isPickedUp) ||
                (!isFaceUp && pickedFaceDown !== null && !isPickedDown);

              return (
                <button
                  key={i}
                  className={`photo-card${isPicked ? " photo-card-selected" : ""}${dimmed ? " photo-card-dimmed" : ""}`}
                  onClick={() => {
                    if (isFaceUp) onPickFaceUp(i);
                    else onPickFaceDown(i);
                  }}
                  aria-label={
                    isFaceUp
                      ? `Face-up photo card ${i + 1}`
                      : `Face-down card ${i + 1}`
                  }
                >
                  {isFaceUp ? (
                    <img
                      src={card.src}
                      alt={`Photo card ${i + 1}`}
                      className="photo-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="photo-card-back">
                      <span className="card-back-logo">flip<br />it.</span>
                    </div>
                  )}
                  {isPicked && <div className="photo-card-check">&#10003;</div>}
                </button>
              );
            })}
          </div>

          {bothPicked && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                className="btn btn-primary"
                style={{
                  background: "linear-gradient(135deg, #e8621a, #e31e24)",
                  padding: "0.85rem 2.5rem",
                  fontSize: "1.05rem",
                }}
                onClick={onReveal}
              >
                Reveal Both Cards
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="revealed-cards">
            {pickedFaceUp !== null && (
              <div className="revealed-card">
                <span className="revealed-label">Chosen card</span>
                <img
                  src={cards[pickedFaceUp].src}
                  alt="Chosen face-up card"
                  className="revealed-img"
                />
              </div>
            )}
            {pickedFaceDown !== null && (
              <div className="revealed-card revealed-card-surprise">
                <span className="revealed-label">Revealed card</span>
                <img
                  src={cards[pickedFaceDown].src}
                  alt="Revealed face-down card"
                  className="revealed-img"
                />
              </div>
            )}
          </div>

          <div className="reflection-area">
            <label>Coach's notes — What do these images bring up?</label>
            <textarea
              placeholder="What does the client see? What feelings or thoughts emerge from these images? What challenge or situation do they connect to?"
              value={notes["findIt"] ?? ""}
              onChange={(e) => onNote("findIt", e.target.value)}
            />
          </div>
        </>
      )}
    </>
  );
}

/* ─── FEEL IT ─── */

function FeelItStep({
  cards,
  pickedFaceUp,
  pickedFaceDown,
  selected,
  onSelect,
  notes,
  onNote,
}: {
  cards: PhotoCard[];
  pickedFaceUp: number | null;
  pickedFaceDown: number | null;
  selected: PowerTool | null;
  onSelect: (t: PowerTool) => void;
  notes: Record<string, string>;
  onNote: (key: string, value: string) => void;
}) {
  return (
    <>
      <h2>Feel It</h2>
      <p className="step-subtitle">
        Based on the images your client chose, which perspective feels most
        present? Select the one that resonates.
      </p>

      {/* Show the two picked photos as a reminder */}
      <div className="mini-photos">
        {pickedFaceUp !== null && (
          <img
            src={cards[pickedFaceUp].src}
            alt="Chosen card"
            className="mini-photo"
          />
        )}
        {pickedFaceDown !== null && (
          <img
            src={cards[pickedFaceDown].src}
            alt="Revealed card"
            className="mini-photo"
          />
        )}
      </div>

      <div className="perspective-grid">
        {powerTools.map((tool) => (
          <button
            key={tool.id}
            className={`perspective-option${
              selected?.id === tool.id ? " selected" : ""
            }`}
            style={
              selected?.id === tool.id
                ? { borderColor: tool.color }
                : undefined
            }
            onClick={() => onSelect(tool)}
          >
            <h4 style={{ color: tool.color }}>{tool.stuck.name}</h4>
            <p>{tool.stuck.definition}</p>
          </button>
        ))}
      </div>

      {selected && (
        <>
          <div style={{ marginTop: "1.5rem" }}>
            {selected.feelItPrompts.map((prompt, i) => (
              <div
                key={i}
                className="prompt-card"
                style={{ borderLeftColor: selected.color }}
              >
                <p>{prompt}</p>
              </div>
            ))}
          </div>
          <div className="reflection-area">
            <label>Coach's notes</label>
            <textarea
              placeholder="Capture key insights from the conversation..."
              value={notes["feelIt"] ?? ""}
              onChange={(e) => onNote("feelIt", e.target.value)}
            />
          </div>
        </>
      )}
    </>
  );
}

/* ─── FRAME IT ─── */

function FrameItStep({
  tool,
  notes,
  onNote,
}: {
  tool: PowerTool;
  notes: Record<string, string>;
  onNote: (key: string, value: string) => void;
}) {
  return (
    <>
      <h2 style={{ color: tool.color }}>Frame It</h2>
      <p className="step-subtitle">
        Show your client the duality. Help them see how{" "}
        <strong>{tool.stuck.name.toLowerCase()}</strong> can be reframed as{" "}
        <strong>{tool.flipped.name.toLowerCase()}</strong>.
      </p>

      <div className="duality-display">
        <div className="duality-side stuck">
          <span className="duality-label">Stuck perspective</span>
          <h3 style={{ color: tool.color }}>{tool.stuck.name}</h3>
          <p>{tool.stuck.definition}</p>
        </div>
        <div className="duality-arrow">&rarr;</div>
        <div
          className="duality-side empowered"
          style={{ background: tool.color }}
        >
          <span
            className="duality-label"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Empowered perspective
          </span>
          <h3>{tool.flipped.name}</h3>
          <p style={{ color: "rgba(255,255,255,0.85)" }}>
            {tool.flipped.definition}
          </p>
        </div>
      </div>

      {tool.frameItPrompts.map((prompt, i) => (
        <div
          key={i}
          className="prompt-card"
          style={{ borderLeftColor: tool.color }}
        >
          <p>{prompt}</p>
        </div>
      ))}
      <div className="reflection-area">
        <label>Coach's notes</label>
        <textarea
          placeholder="What shifted for the client when they saw the duality?"
          value={notes["frameIt"] ?? ""}
          onChange={(e) => onNote("frameIt", e.target.value)}
        />
      </div>
    </>
  );
}

/* ─── FLIP IT ─── */

function FlipItStep({
  tool,
  cards,
  pickedFaceUp,
  pickedFaceDown,
  notes,
  onNote,
  onNewSession,
}: {
  tool: PowerTool;
  cards: PhotoCard[];
  pickedFaceUp: number | null;
  pickedFaceDown: number | null;
  notes: Record<string, string>;
  onNote: (key: string, value: string) => void;
  onNewSession: () => void;
}) {
  return (
    <>
      <h2 style={{ color: tool.color }}>Flip It</h2>
      <p className="step-subtitle">
        Guide your client from{" "}
        <strong>{tool.stuck.name.toLowerCase()}</strong> to{" "}
        <strong>{tool.flipped.name.toLowerCase()}</strong>. What does the new
        perspective look like in practice?
      </p>

      {tool.flipItPrompts.map((prompt, i) => (
        <div
          key={i}
          className="prompt-card"
          style={{ borderLeftColor: tool.color }}
        >
          <p>{prompt}</p>
        </div>
      ))}
      <div className="reflection-area">
        <label>Action commitment</label>
        <textarea
          placeholder="What specific actions will the client commit to?"
          value={notes["flipIt"] ?? ""}
          onChange={(e) => onNote("flipIt", e.target.value)}
        />
      </div>

      {/* Session Summary */}
      <div style={{ marginTop: "2.5rem" }}>
        <h3 style={{ marginBottom: "1rem", fontWeight: 700 }}>
          Session Summary
        </h3>

        <div className="summary-section">
          <h4>Image Cards</h4>
          <div className="mini-photos" style={{ justifyContent: "flex-start" }}>
            {pickedFaceUp !== null && (
              <img
                src={cards[pickedFaceUp].src}
                alt="Chosen card"
                className="mini-photo"
              />
            )}
            {pickedFaceDown !== null && (
              <img
                src={cards[pickedFaceDown].src}
                alt="Revealed card"
                className="mini-photo"
              />
            )}
          </div>
        </div>

        <div className="summary-section">
          <h4>Perspective Shift</h4>
          <div className="summary-duality">
            <span className="stuck-name">{tool.stuck.name}</span>
            <span className="arrow" style={{ color: tool.color }}>
              &rarr;
            </span>
            <span style={{ color: tool.color }}>{tool.flipped.name}</span>
          </div>
        </div>

        {notes["findIt"] && (
          <div className="summary-section">
            <h4>Find It &mdash; Image Reflections</h4>
            <blockquote style={{ borderLeftColor: tool.color }}>
              {notes["findIt"]}
            </blockquote>
          </div>
        )}

        {notes["feelIt"] && (
          <div className="summary-section">
            <h4>Feel It &mdash; Insights</h4>
            <blockquote style={{ borderLeftColor: tool.color }}>
              {notes["feelIt"]}
            </blockquote>
          </div>
        )}

        {notes["frameIt"] && (
          <div className="summary-section">
            <h4>Frame It &mdash; Observations</h4>
            <blockquote style={{ borderLeftColor: tool.color }}>
              {notes["frameIt"]}
            </blockquote>
          </div>
        )}

        {notes["flipIt"] && (
          <div className="summary-section">
            <h4>Flip It &mdash; Action Commitment</h4>
            <blockquote style={{ borderLeftColor: tool.color }}>
              {notes["flipIt"]}
            </blockquote>
          </div>
        )}

        <button
          className="btn btn-primary btn-new-session"
          style={{ background: tool.color }}
          onClick={onNewSession}
        >
          Start a New Session
        </button>
      </div>
    </>
  );
}
