export const gameInfo = {
  name: "Nostalgia VR",
  developer: "Constantplot",
  studio: "Dimensional Studios",
  version: "0.185",
  releaseDate: "April 6, 2026",
  rating: "3.9",
  totalRatings: 107,
  totalReviews: 43,
  category: "Games",
  genres: ["Platformer", "Action", "Horror"],
  platforms: ["Meta Quest 3S", "Meta Quest 3", "Meta Quest Pro", "Meta Quest 2"],
  controllers: "Touch Controllers",
  playerModes: ["Standing", "Roomscale"],
  gameModes: "Multiplayer",
  spaceRequired: "668.58 MB",
  comfortLevel: "Comfortable",
  internet: "Internet connection required",
  website: "https://www.meta.com/experiences/nostalgia-vr/26292042740447025/",
  discord: "https://discord.gg/tpnqKTGk",
  tagline: "Step into the liminal. Survive the nostalgia.",
  description: `Nostalgia VR is a fun horror game to play with your friends. Explore many nostalgic levels like Dreamcore, Weirdcore, Frutiger Aero, and multiple Backrooms levels. Have fun and follow the rules!`,
  ratingBreakdown: {
    5: 57,
    4: 14,
    3: 7,
    2: 6,
    1: 16,
  },
};

export interface Level {
  id: number;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  image?: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Dreamcore",
    description:
      "Drift through surreal, pastel-drenched dreamscapes where reality bends and familiar places feel hauntingly wrong. An eerie but comforting liminal experience.",
    tags: ["Liminal", "Horror", "Multiplayer"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Weirdcore",
    description:
      "Distorted imagery, unsettling aesthetics, and a deep sense of dread. Weirdcore pulls you into a world that feels both familiar and deeply wrong.",
    tags: ["Horror", "Atmospheric", "Multiplayer"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 3,
    title: "Frutiger Aero",
    description:
      "Glossy surfaces, nature motifs, and the warm glow of early 2000s tech. A nostalgic paradise hiding something sinister beneath its polished exterior.",
    tags: ["Nostalgic", "Aesthetic", "Multiplayer"],
    gradient: "from-teal-500/20 to-green-500/20",
  },
  {
    id: 4,
    title: "The Backrooms — Level 0",
    description:
      "The classic yellow wallpaper, buzzing fluorescent lights, and the smell of wet carpet. No exits. No escape. Just the hum.",
    tags: ["Backrooms", "Horror", "Multiplayer"],
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: 5,
    title: "The Backrooms — Deep Levels",
    description:
      "Venture beyond Level 0 into darker, stranger territories. Each level more unsettling than the last. Watch your back.",
    tags: ["Backrooms", "Horror", "Multiplayer"],
    gradient: "from-red-500/20 to-rose-500/20",
  },
  {
    id: 6,
    title: "More Levels Coming",
    description:
      "Constantplot continues to expand Nostalgia VR with new liminal worlds, horror scenarios, and multiplayer experiences. Stay tuned.",
    tags: ["Upcoming", "Multiplayer"],
    gradient: "from-slate-500/20 to-slate-700/20",
  },
];

export interface Review {
  id: number;
  name: string;
  rating: number;
  title: string;
  text: string;
  helpful: number;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Phantom._.0",
    rating: 5,
    title: "Just what I was looking for",
    text: "I've been looking for a dreamcore/backrooms game and have had no luck until I found this game. It was just what I was looking for, an eerie but comforting game. I love all the levels and it was just what I was looking for.",
    helpful: 11,
    date: "4 days ago",
  },
  {
    id: 2,
    name: "QQ21",
    rating: 4,
    title: "Really good liminal game",
    text: "I like the nostalgic effects and feeling it gives and the devs or dev actually put effort into the levels, but I don't like how it's mostly puzzle levels and just the same monster but overall the game is really good.",
    helpful: 9,
    date: "Apr 6",
  },
  {
    id: 3,
    name: "raredragon81",
    rating: 3,
    title: "Really good but…",
    text: "Haven't played the game, but already seeing potential in it. My complaint is it won't let me join a lobby, displaying the player count as 0. Already tried to join a public and private lobby and it won't work. I already tried restarting the game and redownloading it. Overall, I see potential in it — just please fix the bugs.",
    helpful: 14,
    date: "2 days ago",
  },
];

export interface GameFeature {
  title: string;
  description: string;
  icon: string;
}

export const features: GameFeature[] = [
  {
    title: "Multiplayer Horror",
    description: "Explore terrifying liminal spaces with your friends. Face the unknown together.",
    icon: "01",
  },
  {
    title: "Nostalgic Levels",
    description: "Dreamcore, Weirdcore, Frutiger Aero, and multiple Backrooms levels to explore.",
    icon: "02",
  },
  {
    title: "VR Immersion",
    description: "Full roomscale and standing support on all Meta Quest headsets for maximum immersion.",
    icon: "03",
  },
  {
    title: "Eerie Atmosphere",
    description: "Carefully crafted environments that feel both familiar and deeply unsettling.",
    icon: "04",
  },
];

export interface GameSpec {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  type: "work" | "military" | "education";
}

export const specs: GameSpec[] = [
  {
    id: 1,
    title: "Supported Platforms",
    company: "Meta Quest",
    period: "Released April 6, 2026",
    description: [
      "Meta Quest 3S — Full support",
      "Meta Quest 3 — Full support",
      "Meta Quest Pro — Full support",
      "Meta Quest 2 — Full support",
    ],
    type: "work",
  },
  {
    id: 2,
    title: "Game Details",
    company: "Constantplot",
    period: "Version 0.185",
    description: [
      "Category: Games — Platformer, Action",
      "Game Mode: Multiplayer",
      "Player Modes: Standing, Roomscale",
      "Controllers: Touch Controllers",
    ],
    type: "work",
  },
  {
    id: 3,
    title: "Technical Requirements",
    company: "System Info",
    period: "668.58 MB",
    description: [
      "Space Required: 668.58 MB",
      "Internet Connection: Required",
      "Comfort Level: Comfortable",
      "Microphone: Used for multiplayer",
    ],
    type: "education",
  },
  {
    id: 4,
    title: "Developer",
    company: "Dimensional Studios",
    period: "Constantplot",
    description: [
      "Developer: Constantplot",
      "Publisher: Constantplot",
      "Studio: Dimensional Studios",
      "Built in Unity",
    ],
    type: "work",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Levels", href: "#levels" },
  { label: "Details", href: "#details" },
  { label: "Reviews", href: "#reviews" },
  { label: "Community", href: "#community" },
];
