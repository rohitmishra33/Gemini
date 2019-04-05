import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ScoreServiceService } from '../score-service.service';
import { Subscription } from 'rxjs';
import { isNumber } from 'util';

@Component({
  selector: 'app-scoreboard',
  styleUrls: ['scoreboard.component.css'],
  templateUrl: 'scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource: Array<Array<number>>;
  displayedColumns: string[] = [];
  private docSub: Subscription;
  scoreInputBoxes: any[] = [];
  total: number[];
  possibleScoreValues: number[] = [-5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  constructor(private scoreServiceService: ScoreServiceService) {
    this.scoreServiceService.getScores().subscribe(data => {
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
    this.scoreServiceService.init();
  }

  ngOnDestroy() {
    this.docSub.unsubscribe();
  }

  ngAfterViewInit() {
    // this.docSub = this.scoreServiceService.gameObject.subscribe();
    this.scoreServiceService.getScores();
  }

  addPlayer(playerName) {
    if (playerName) {
      console.log('Adding Player: ' + playerName.value);
      this.scoreServiceService.addPlayer(playerName.value);
      playerName.value = '';
    }
  }

  addScores() {
    if (this.scoreInputBoxes.length) {
      this.scoreServiceService.addScores(this.scoreInputBoxes);
      this.scoreInputBoxes = [];
    }
  }

}
