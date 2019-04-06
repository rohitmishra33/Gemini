import { Component, OnInit } from '@angular/core';
import { ScoreService, Game } from 'app/score-service.service';

@Component({
	selector: 'app-add-score',
	templateUrl: './add-score.component.html',
	styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent implements OnInit {

	players: string[];
	score: number[] = [];
	possibleScores: number[] = [-5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

	constructor(private scoreService: ScoreService) {
		this.scoreService.getScores().subscribe(data => {
			this.players = data.players;
		});
	}

	ngOnInit() {
	}

	addScores() {
		this.scoreService.addScores(this.score);
		this.score = [];
	}

	checkAllScores(): boolean {
		if (this.score.length == this.players.length && this.score.length > 0) {
			if (this.score.filter(x => x == null).length == 0)
				return false;
		}
		return true;
	}

}
