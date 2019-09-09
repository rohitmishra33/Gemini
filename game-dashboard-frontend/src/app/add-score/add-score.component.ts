import { Component, OnInit } from '@angular/core';
import { ScoreService, Game } from 'app/score-service.service';

@Component({
	selector: 'app-add-score',
	templateUrl: './add-score.component.html',
	styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent implements OnInit {

	players: string[];
	game = [];
	possibleScores: number[] = [-5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

	constructor(private scoreService: ScoreService) {
		this.scoreService.getPlayers().subscribe(data => {
			this.players = data;
			this.game = [];
			
			this.players.forEach(p => {
				this.game.push({
					name: p,
					score: null
				});
			})
		});
	}

	ngOnInit() {
	}

	addScores() {
		let id = new Date().getTime();
		let gameObj = {
			id: id,
			game: this.game
		};
		this.scoreService.addScores(gameObj);
	}

	checkAllScores(): boolean {
		if(this.game.length > 0) {
			if(this.game.filter(g => g.score == null).length == 0) {
				return false;
			}
		}
		return true;
	}

}
