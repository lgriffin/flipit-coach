export interface PowerTool {
  id: string;
  stuck: {
    name: string;
    type: string;
    definition: string;
  };
  flipped: {
    name: string;
    type: string;
    definition: string;
  };
  color: string;
  colorDark: string;
  findItPrompts: string[];
  feelItPrompts: string[];
  frameItPrompts: string[];
  flipItPrompts: string[];
}

export const powerTools: PowerTool[] = [
  {
    id: "blame-responsibility",
    stuck: {
      name: "Blame",
      type: "verb",
      definition:
        "To judge, or attribute fault or wrong-doing to the action or inaction of others",
    },
    flipped: {
      name: "Responsibility",
      type: "noun",
      definition:
        "To own your participation in something; to be accountable for results, strategy or action taken",
    },
    color: "#E8621A",
    colorDark: "#C54E10",
    findItPrompts: [
      "Are you pointing the finger at someone else for how things are?",
      "Do you feel that someone else is the reason you're stuck?",
      "Are you waiting for someone else to fix the situation?",
    ],
    feelItPrompts: [
      "What does it feel like to hold this blame?",
      "How is blaming others affecting your energy and focus?",
      "What would change if you let go of the need to assign fault?",
    ],
    frameItPrompts: [
      "Blame keeps you powerless — responsibility gives you power back.",
      "When we blame, we hand control of our situation to someone else.",
      "What part of this situation is within your control?",
    ],
    flipItPrompts: [
      "What is one thing you can take responsibility for right now?",
      "How would owning this situation change the way you feel about it?",
      "What's one action you could take today as the accountable person here?",
    ],
  },
  {
    id: "delay-action",
    stuck: {
      name: "Delay",
      type: "verb",
      definition:
        "To postpone or defer an action (consciously or unconsciously)",
    },
    flipped: {
      name: "Action",
      type: "noun",
      definition:
        "Commitment to the steps required for the achievement of your goals",
    },
    color: "#9B1B30",
    colorDark: "#7A1526",
    findItPrompts: [
      "Are you putting something off that you know needs to happen?",
      "Do you keep saying 'I'll get to it later'?",
      "Is there something you've been avoiding starting?",
    ],
    feelItPrompts: [
      "What does the delay feel like in your body and mind?",
      "How is postponing this affecting other areas of your life?",
      "What are you afraid might happen if you start?",
    ],
    frameItPrompts: [
      "Delay keeps you stuck in planning — action moves you forward.",
      "Every moment of delay is a choice, even when it feels automatic.",
      "What's the smallest step you could take to break the pattern?",
    ],
    flipItPrompts: [
      "What is one concrete action you can commit to this week?",
      "What would it feel like to have already started?",
      "What's the very first step — not the whole plan, just step one?",
    ],
  },
  {
    id: "doubt-trust",
    stuck: {
      name: "Doubt",
      type: "noun",
      definition:
        "Uncertainty based on fear and assumptions about someone or something",
    },
    flipped: {
      name: "Trust",
      type: "noun",
      definition:
        "A firm belief in the reliability or truth of someone or something",
    },
    color: "#E31E24",
    colorDark: "#B8181D",
    findItPrompts: [
      "Are you second-guessing yourself or someone else?",
      "Is fear driving your uncertainty about what to do next?",
      "Are you making assumptions rather than working with facts?",
    ],
    feelItPrompts: [
      "Where do you feel this doubt — in your body, your thoughts?",
      "How long have you been carrying this uncertainty?",
      "What would it feel like if the doubt simply wasn't there?",
    ],
    frameItPrompts: [
      "Doubt is based on fear and assumptions — trust is based on belief and evidence.",
      "What evidence do you have that things might actually work out?",
      "When in the past have you trusted yourself and it paid off?",
    ],
    flipItPrompts: [
      "What would you do right now if you fully trusted yourself?",
      "What's one thing you can choose to trust about this situation?",
      "How can you build evidence for trust, starting today?",
    ],
  },
  {
    id: "fraud-truth",
    stuck: {
      name: "Fraud",
      type: "noun",
      definition: "Self deception or lack of alignment to your values",
    },
    flipped: {
      name: "Truth",
      type: "noun",
      definition:
        "Being authentic or acting in alignment with your values",
    },
    color: "#8B1A2B",
    colorDark: "#6E1522",
    findItPrompts: [
      "Are you pretending to be something you're not?",
      "Do you feel out of alignment with what matters most to you?",
      "Are you telling yourself a story that doesn't match reality?",
    ],
    feelItPrompts: [
      "What does it feel like to be out of alignment with your values?",
      "Where is the gap between who you are and who you're presenting?",
      "How is this self-deception draining your energy?",
    ],
    frameItPrompts: [
      "Fraud disconnects you from yourself — truth reconnects you.",
      "Living out of alignment creates internal friction that slows everything down.",
      "What are the values that matter most to you right now?",
    ],
    flipItPrompts: [
      "What would it look like to show up authentically in this situation?",
      "What's one value you want to live more fully, starting now?",
      "What truth have you been avoiding that's ready to be spoken?",
    ],
  },
  {
    id: "invalidation-respect",
    stuck: {
      name: "Invalidation",
      type: "noun",
      definition:
        "Not acknowledging or appreciating the worth and value of someone or something (including yourself); rejecting, ignoring or judging",
    },
    flipped: {
      name: "Respect",
      type: "noun",
      definition:
        "Acknowledging and appreciating the worth and value of someone or something (including yourself)",
    },
    color: "#EAA819",
    colorDark: "#C48B0F",
    findItPrompts: [
      "Are you dismissing your own achievements or contributions?",
      "Are you rejecting or judging yourself or someone else?",
      "Do you feel like what you do doesn't really matter?",
    ],
    feelItPrompts: [
      "What does it feel like when your worth goes unacknowledged?",
      "How does invalidation show up in your self-talk?",
      "What impact is this having on your confidence?",
    ],
    frameItPrompts: [
      "Invalidation dismisses worth — respect recognises it.",
      "When we invalidate ourselves, we teach others to do the same.",
      "What would it mean to truly respect your own contribution?",
    ],
    flipItPrompts: [
      "Name three things about yourself that deserve acknowledgment.",
      "How can you show yourself respect in this situation?",
      "What would change if you treated your efforts as genuinely valuable?",
    ],
  },
  {
    id: "reacting-responding",
    stuck: {
      name: "Reacting",
      type: "verb",
      definition:
        "To reply or act in a defensive way, without taking long term effects into consideration",
    },
    flipped: {
      name: "Responding",
      type: "verb",
      definition:
        "To reply or act in a mindful way from a grounded perspective",
    },
    color: "#EAA819",
    colorDark: "#C48B0F",
    findItPrompts: [
      "Are you acting out of frustration or defensiveness?",
      "Did you snap or make a quick decision you might regret?",
      "Are you operating on autopilot rather than being intentional?",
    ],
    feelItPrompts: [
      "What triggered the reactive response?",
      "How does it feel in your body when you're in reaction mode?",
      "What are the long-term consequences you're not considering?",
    ],
    frameItPrompts: [
      "Reacting is defensive — responding is mindful.",
      "Between stimulus and response, there is a space. In that space is your power to choose.",
      "What would a grounded version of yourself do here?",
    ],
    flipItPrompts: [
      "What would it look like to pause and respond rather than react?",
      "What do you need to feel grounded before you take your next step?",
      "How can you create space between the trigger and your response?",
    ],
  },
  {
    id: "significance-lightness",
    stuck: {
      name: "Significance",
      type: "noun",
      definition:
        "Feeling overwhelmed and heavy; being overly attached to a particular outcome or belief",
    },
    flipped: {
      name: "Lightness",
      type: "noun",
      definition:
        "Being in the moment; coming from a perspective of creativity and possibility",
    },
    color: "#E8621A",
    colorDark: "#C54E10",
    findItPrompts: [
      "Does everything feel heavy and overwhelming right now?",
      "Are you holding on too tightly to one specific outcome?",
      "Does this situation feel like it has more weight than it should?",
    ],
    feelItPrompts: [
      "Where do you feel the heaviness — emotionally, physically?",
      "What are you most attached to in this situation?",
      "What would it feel like to let go of the need for a specific outcome?",
    ],
    frameItPrompts: [
      "Significance weighs you down — lightness opens up possibility.",
      "When we grip too tightly, we close off creative solutions.",
      "What if there are other outcomes that could be equally good?",
    ],
    flipItPrompts: [
      "What possibilities open up if you hold this more lightly?",
      "What would a playful, creative approach to this look like?",
      "What can you let go of right now to create space for something new?",
    ],
  },
  {
    id: "trying-commitment",
    stuck: {
      name: "Trying",
      type: "verb",
      definition:
        "To make an attempt or effort to do something; to act or talk without intent",
    },
    flipped: {
      name: "Commitment",
      type: "noun",
      definition:
        "To be dedicated to the achievement of a cause or activity, and possess the willingness to do what it takes to make it happen",
    },
    color: "#E8621A",
    colorDark: "#C54E10",
    findItPrompts: [
      "Are you 'trying' to do something rather than actually doing it?",
      "Do you hear yourself saying 'I'll try' a lot?",
      "Are you going through the motions without real intent?",
    ],
    feelItPrompts: [
      "What does 'trying' feel like compared to truly committing?",
      "What's holding you back from full commitment?",
      "How does the half-heartedness affect your results?",
    ],
    frameItPrompts: [
      "Trying leaves room for failure — commitment leaves room for success.",
      "'I'll try' is a safety net that keeps you from ever truly jumping.",
      "What's the difference between trying and doing for you?",
    ],
    flipItPrompts: [
      "What would full commitment to this look like?",
      "Replace 'I'll try' with 'I will' — how does that change things?",
      "What are you willing to do — not try to do, but actually do?",
    ],
  },
];
