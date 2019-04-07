import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PlayerNames } from 'app/classes/player-names';
import { ScoreService } from 'app/score-service.service';

@Component({
	selector: 'app-start-game',
	templateUrl: './start-game.component.html',
	styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

	newPlayer: string;
	selectedPlayers = [];
	playerNames = [];

	constructor(private scoreService: ScoreService) { 
		this.scoreService.getPlayers().subscribe(data => {
			this.selectedPlayers = data;
			let extras = data.filter(x => this.playerNames.indexOf(x) == -1);
			this.playerNames = this.playerNames.concat(extras);
		});
	}

	ngOnInit() {
		this.scoreService.init();
		this.playerNames = Object.keys(PlayerNames);
		this.playerNames = this.playerNames.slice(this.playerNames.length / 2);
	}

	isPlayerSelected(player: string): boolean {
		return this.selectedPlayers.indexOf(player) >= 0;
	}

	togglePlayer(player: string) {
		if (this.isPlayerSelected(player)) {
			let index = this.selectedPlayers.indexOf(player);
			this.selectedPlayers.splice(index, 1);
		} else {
			this.selectedPlayers.push(player);
		}

		this.updateTable();
	}

	addNewPlayer() {
		if (this.newPlayer.length > 0) {
			this.playerNames.push(this.newPlayer);
			this.selectedPlayers.push(this.newPlayer);
			this.newPlayer = null;
		}
		this.updateTable();
	}

	updateTable() {
		this.scoreService.addPlayers(this.selectedPlayers);
	}
}
