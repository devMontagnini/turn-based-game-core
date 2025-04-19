import { Role } from "./role";
import { Player } from "./player";
import { TeamPlayer } from "./partials/team-player";
import { AssignableEntity } from "./assignable.entity";
import { UIConfiguration } from "./partials/ui-position";

export class Team extends AssignableEntity<Team> {

  protected readonly _players: TeamPlayer[] = [];
  readonly uiConfiguration?: UIConfiguration;

  addPlayer(player: Player): void {
    this._players.push({ player });
  };

  setPlayerRole(player: Player, role: Role): void {
    this._players.find(c => c.player.id === player.id)!.role = role;
  };
}