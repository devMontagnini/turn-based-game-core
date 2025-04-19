import { Team } from "../team";
import { Player } from "../player";
import { TurnActionTypes } from "../enums/turn-action.types";

export interface TurnAction {
  team: Team;
  player: Player;
  type: TurnActionTypes;
}