import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ScoreService {

	constructor(private socket: Socket) { }

	getScores(): Observable<Game[]> {
		return new Observable<Game[]>(observer => {
			this.socket.on('scoreBroadcast', (data: Game[]) => observer.next(data));
		});
	}

	addPlayers(playerNames: string[]) {
		this.socket.emit('addPlayers', playerNames);
	}

	getPlayers(): Observable<string[]> {
		return new Observable<string[]>(o => {
			this.socket.on('getPlayers', (data: string[]) => o.next(data));
		});
	}

	addScores(gameScore: Game) {
		this.socket.emit('addScores', gameScore);
	}

	deleteGame(id: number) {
		this.socket.emit('deleteGame', id);
	}

	init() {
		this.socket.emit('getScores');
	}

}

export interface Game {
	id: number;
	game: Score[];
}

interface Score {
	name: string;
	score: number;
}
