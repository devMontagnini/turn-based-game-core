import { Team } from "../team";
import { MatchTeamStatus } from "../enums/match-team.status";

export interface MatchTeam {
  team: Team;
  points: number;
  status: MatchTeamStatus;
}