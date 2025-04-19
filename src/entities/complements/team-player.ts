import { Role } from "../role";
import { Player } from "../player";

export interface TeamPlayer {
  role?: Role;
  player: Player;
}