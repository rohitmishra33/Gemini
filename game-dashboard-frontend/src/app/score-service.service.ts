import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {

  constructor(private socket: Socket) { }

  getScores(): Observable<Game> {
    return new Observable<Game>(observer => {
      this.socket.on('scoreBroadcast', (data: Game) => observer.next(data));
    });
  }

  addPlayer(playerName: string) {
    this.socket.emit('addPlayer', playerName);
  }

  addScores(gameScore) {
    this.socket.emit('addScores', gameScore);
  }

  init() {
    this.socket.emit('getScores');
  }

}

export interface Game {
  players: Array<string>;
  scores: Array<Array<number>>;
}
