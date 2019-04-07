import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score-service.service';

@Component({
	selector: 'app-scoreboard',
	styleUrls: ['scoreboard.component.css'],
	templateUrl: 'scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit {

	players: string[];
	totals: number[] = [];
	games = {};

	constructor(private scoreService: ScoreService) {

		this.scoreService.getPlayers().subscribe(data => {
			this.players = data;
			this.getScores();
		});
	}

	ngOnInit() {
		this.scoreService.init();
	}

	getScores() {
		this.scoreService.getScores().subscribe(data => {
			this.games = {};
			this.totals = [];
			data.forEach(x => {
				this.games[x.id] = new Array(this.players.length);
				for (let i = 0; i < this.players.length; i++) {
					let obj = x.game.filter(y => y.name == this.players[i])[0];
					if (obj) {
						let score = obj.score;
						this.games[x.id][i] = score;
						this.totals[i] = this.totals[i] || 0;
						this.totals[i] += +score;
					}
				}
			})
		});
	}

	delete(id: number) {
		this.scoreService.deleteGame(id);
	}

}
