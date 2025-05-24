# NBA Draft Hub

A responsive, data-driven NBA Draft scouting dashboard built with **React**, **Vite**, and **Material UI**.

## Features

- 📋 **Big Board** with player rankings, average ranks, and scout-specific insights
- 🔍 **Search**, **filter**, and **sort** players by name, scout ranking, height, and age
- 👤 **Player Profile** with full bio, measurements, season stats, and interactive scouting reports
- 📝 Add and display **scouting reports** (saved in state)
- 📊 **Compare Page** to view two players side-by-side, including key season statistics
- 📱 Responsive layout optimized for laptops, tablets, and phones

## Technologies

- **React** + **Vite**
- **Material UI** (MUI)
- **TypeScript**
- Local JSON data (no backend)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nba-draft-hub.git
   cd nba-draft-hub
  
2. Install dependencies:
   ```bash
   npm install

3. Run the app: 
   ```bash
   npm run dev

## Folder Structure

src/
├── components/         # React components (BigBoard, PlayerProfile, ComparePage)
├── data/               # JSON data and TypeScript interfaces
├── App.tsx             # Main app routing
├── main.tsx            # Entry point
└── styles/             # CSS files (if any)


## Notes

- Scouting reports are stored in component state and will not persist after a page refresh
- The UI is fully dynamic and adapts to any dataset following the expected JSON structure

## Future Ideas

- Add dark mode toggle
- Persist scouting reports using localStorage
- Enhance comparison view with visual charts
- Add measurements to comparison page