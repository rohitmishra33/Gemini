import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StartGameComponent } from './start-game/start-game.component';
import { AppRoutingModule } from './app-routing.module';
import { AddScoreComponent } from './add-score/add-score.component';

const config: SocketIoConfig = { url: 'http://192.168.0.49:3000', options: {} };

enableProdMode();

@NgModule({
	declarations: [
		AppComponent,
		ScoreboardComponent,
		StartGameComponent,
		AddScoreComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatTableModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		FormsModule,
		SocketIoModule.forRoot(config),
		AppRoutingModule
	],
	exports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
