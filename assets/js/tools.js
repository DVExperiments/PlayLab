/* ==========================================================================
   Futures PlayLab: tool registry
   This is the one list that drives the home page and the navigation menu.

   To launch a tool: build it in its folder, then change its status
   from "planned" to "live" below. Nothing else needs editing.

   Fields
     id          short name, matches the tool's folder and data-tool attribute
     category    "futures", "design" or "literacy"
     name        shown in menus and on the home page
     path        folder path from the site root, ending in /
     description one sentence, written for the student
     minutes     rough time to complete
     output      what the student leaves with
     status      "live" or "planned"
   ========================================================================== */

window.PLAYLAB_TOOLS = {
  categories: [
    {
      id: "futures",
      name: "Futures thinking",
      description: "Explore the range of futures that could unfold, and the one you want to help shape."
    },
    {
      id: "design",
      name: "Design thinking",
      description: "Frame problems well, test your assumptions, and design with the people affected."
    },
    {
      id: "literacy",
      name: "Digital literacy",
      description: "Look under the hood of the technology you use every day, and question what you find."
    }
  ],

  tools: [
    /* ---------- Futures thinking ---------- */
    {
      id: "futures-wheel",
      category: "futures",
      name: "Futures Wheel",
      path: "futures/futures-wheel/",
      description: "Map the ripple effects of a change, out to the consequences of its consequences.",
      minutes: 15,
      output: "A consequences map",
      status: "live"
    },
    {
      id: "futures-cone",
      category: "futures",
      name: "Futures Cone Sorter",
      path: "futures/futures-cone/",
      description: "Sort scenarios into probable, plausible, possible and preferable, then question why you put them there.",
      minutes: 10,
      output: "A sorted set of scenarios",
      status: "planned"
    },
    {
      id: "signal-collider",
      category: "futures",
      name: "Signal Collider",
      path: "futures/signal-collider/",
      description: "Draw random mixes of signals, settings, people and objects, then imagine everyday life in the future.",
      minutes: 10,
      output: "A collection of future artefacts",
      status: "live"
    },
    {
      id: "three-horizons",
      category: "futures",
      name: "Three Horizons Mapper",
      path: "futures/three-horizons/",
      description: "Map what’s fading, what’s emerging and what you want to grow in your own field.",
      minutes: 20,
      output: "A three horizons map",
      status: "planned"
    },
    {
      id: "backcasting",
      category: "futures",
      name: "Backcasting Timeline",
      path: "futures/backcasting/",
      description: "Start from a future you want and work backwards to what needs to happen today.",
      minutes: 20,
      output: "A step-by-step timeline",
      status: "planned"
    },

    /* ---------- Design thinking ---------- */
    {
      id: "hmw-reframer",
      category: "design",
      name: "How Might We Reframer",
      path: "design/hmw-reframer/",
      description: "Turn one problem statement into many by stretching, shrinking and flipping it.",
      minutes: 10,
      output: "A list of reframed questions",
      status: "planned"
    },
    {
      id: "assumption-mapper",
      category: "design",
      name: "Assumption Mapper",
      path: "design/assumption-mapper/",
      description: "Plot your assumptions by importance and evidence to find what to test first.",
      minutes: 15,
      output: "A prioritised test list",
      status: "planned"
    },
    {
      id: "pre-mortem",
      category: "design",
      name: "Pre-mortem",
      path: "design/pre-mortem/",
      description: "Imagine your project has failed, then work out why before it happens.",
      minutes: 15,
      output: "A list of risks and responses",
      status: "planned"
    },
    {
      id: "stakeholder-map",
      category: "design",
      name: "Stakeholder Ecosystem Map",
      path: "design/stakeholder-map/",
      description: "Map who a technology touches, including the people and places easily left out.",
      minutes: 20,
      output: "A stakeholder map",
      status: "planned"
    },

    /* ---------- Digital literacy ---------- */
    {
      id: "browser-knows",
      category: "literacy",
      name: "What Your Browser Knows",
      path: "literacy/browser-knows/",
      description: "See what any website can learn about you without asking.",
      minutes: 5,
      output: "A picture of your digital footprint",
      status: "live"
    },
    {
      id: "feed-sandbox",
      category: "literacy",
      name: "Feed Algorithm Sandbox",
      path: "literacy/feed-sandbox/",
      description: "Adjust the levers behind a social feed and watch what rises to the top.",
      minutes: 10,
      output: "Notes on how ranking shapes what you see",
      status: "planned"
    },
    {
      id: "biased-classifier",
      category: "literacy",
      name: "Train a Biased Classifier",
      path: "literacy/biased-classifier/",
      description: "Teach a tiny model from lopsided examples and see where it goes wrong.",
      minutes: 15,
      output: "A worked example of data bias",
      status: "planned"
    },
    {
      id: "ai-critique",
      category: "literacy",
      name: "AI Output Critique Lab",
      path: "literacy/ai-critique/",
      description: "Compare AI and human work side by side using a practical checklist.",
      minutes: 15,
      output: "A critique checklist you can reuse",
      status: "planned"
    },
    {
      id: "data-sovereignty",
      category: "literacy",
      name: "Data Sovereignty Explorer",
      path: "literacy/data-sovereignty/",
      description: "Trace where your everyday data lives and who has authority over it, including Māori data sovereignty principles.",
      minutes: 20,
      output: "A map of your data and who holds it",
      status: "planned"
    }
  ]
};
