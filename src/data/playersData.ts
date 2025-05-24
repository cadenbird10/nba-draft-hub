import rawData from '../../intern_project_data.json';

// Type assertions for strict TypeScript compatibility
export const bio: PlayerBio[] = rawData.bio as PlayerBio[];
export const scoutRankings: ScoutRanking[] = rawData.scoutRankings as ScoutRanking[];
export const measurements: PlayerMeasurements[] = rawData.measurements as PlayerMeasurements[];
export const gameLogs: GameLog[] = rawData.game_logs as GameLog[];
export const seasonLogs: SeasonLog[] = rawData.seasonLogs as SeasonLog[];
export const scoutingReports: ScoutingReport[] = rawData.scoutingReports as ScoutingReport[];

// Interfaces below

export interface PlayerBio {
  name: string;
  playerId: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  height: number;
  weight: number;
  highSchool: string;
  highSchoolState: string;
  homeTown: string;
  homeState: string;
  homeCountry: string;
  nationality: string;
  photoUrl: string;
  currentTeam: string;
  league: string;
  leagueType: string;
}

export interface ScoutRanking {
  playerId: number;
  [scoutName: string]: number | string;
}

export interface PlayerMeasurements {
  playerId: number;
  heightNoShoes: number | null;
  heightShoes: number | null;
  wingspan: number | null;
  reach: number | null;
  maxVertical: number | null;
  noStepVertical: number | null;
  weight: number | null;
  bodyFat: number | null;
  handLength: number | null;
  handWidth: number | null;
  agility: number | null;
  sprint: number | null;
  shuttleLeft: number | null;
  shuttleRight: number | null;
  shuttleBest: number | null;
}

export interface GameLog {
  playerId: number;
  gameId: number;
  season: number;
  league: string;
  date: string;
  team: string;
  teamId: number;
  opponentId: number;
  isHome: number;
  opponent: string;
  homeTeamPts: number;
  visitorTeamPts: number;
  gp: number;
  gs: number;
  timePlayed: string;
  fgm: number;
  fga: number;
  "fg%": number;
  tpm: number;
  tpa: number;
  "tp%": number;
  ftm: number;
  fta: number;
  "ft%": number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  pf: number;
  pts: number;
  plusMinus: number;
  rn: number;
}

export interface SeasonLog {
  playerId: number;
  age: string;
  Season: number;
  League: string;
  Team: string;
  w: number;
  l: number;
  GP: number;
  GS: number;
  MP: number;
  FGM: number;
  FGA: number;
  "FG%": number;
  FG2M: number;
  FG2A: number;
  "FG2%": number;
  "eFG%": number;
  "3PM": number;
  "3PA": number;
  "3P%": number;
  FT: number;
  FTA: number;
  FTP: number;
  ORB: number;
  DRB: number;
  TRB: number;
  AST: number;
  STL: number;
  BLK: number;
  TOV: number;
  PF: number;
  PTS: number;
}

export interface ScoutingReport {
  scout: string;
  reportId: string;
  playerId: number;
  report: string;
}
