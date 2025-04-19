import { Role } from "../role";
import { Team } from "../team";
import { Match } from "../match";
import { Player } from "../player";
import { RulesCheckResult } from "./rules.check-result";

export interface Rules {

  readonly name: string;
  readonly matchMinimumNumberOfTeamsToStart: number;
  readonly matchMaximumNumberOfTeamsSupported: number;
  readonly teamMinimumNumberOfPlayersToBeReady: number;
  readonly teamMaximumNumberOfPlayersSupported: number;
  readonly teamCanHaveDuplicatedRoles: boolean;
  readonly teamStartsWithPointsAmount: number;
  readonly turnActionShiftPoints: number;
  readonly turnActionAttackRoleId: string;
  readonly turnActionDefenceRoleId: string;

  teamIsReady: (data?: { team: Team }) => RulesCheckResult;
  matchCanStart: (data?: { match: Match }) => RulesCheckResult;
  addTeamOnMatch: (data: { match: Match; team: Team }) => RulesCheckResult;
  addPlayerOnTeam: (data?: { team: Team; player: Player }) => RulesCheckResult;
  addUnSettledPlayer: (data: { match: Match; player: Player }) => RulesCheckResult;
  setPlayerTeamRole: (data?: { team: Team; player: Player; role: Role }) => RulesCheckResult;
}