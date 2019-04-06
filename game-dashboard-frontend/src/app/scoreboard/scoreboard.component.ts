import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScoreService } from '../score-service.service';
import { isNumber } from 'util';

@Component({
	selector: 'app-scoreboard',
	styleUrls: ['scoreboard.component.css'],
	templateUrl: 'scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit, AfterViewInit {

	dataSource: Array<Array<number>>;
	displayedColumns: string[] = [];
	scoreInputBoxes: any[] = [];
	total: number[];
	possibleScoreValues: number[] = [-5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

	constructor(private scoreService: ScoreService) {
		this.scoreService.getScores().subscribe(data => {
			this.displayedColumns = data.players;
			this.dataSource = data.scores;
			this.total = [];
			console.log(this.dataSource);
			for (let i = 0; i < this.displayedColumns.length; i++) {
				let sum = 0;
				for (let j = 0; j <= this.dataSource.length - 1; j++) {
					if (isNumber(this.dataSource[j][i])) {
						sum += this.dataSource[j][i];
					}
				}
				this.total.push(sum);
			}
			console.log(this.total);
			console.log(data);
		});
	}

	ngOnInit() {
		this.scoreService.init();
	}

	ngAfterViewInit() {
		this.scoreService.getScores();
	}

	addScores() {
		if (this.scoreInputBoxes.length) {
			this.scoreService.addScores(this.scoreInputBoxes);
			this.scoreInputBoxes = [];
		}
	}

}
