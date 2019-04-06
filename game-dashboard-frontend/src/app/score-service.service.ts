import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ScoreService {

	constructor(private socket: Socket) { }

	getScores(): Observable<Game> {
		return new Observable<Game>(observer => {
			this.socket.on('scoreBroadcast', (data: Game) => observer.next(data));
		});
	}

	addPlayers(playerNames: string[]) {
		this.socket.emit('addPlayers', playerNames);
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
