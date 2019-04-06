import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScoreComponent } from './add-score/add-score.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: ScoreboardComponent },
	{ path: 'addScore', component: AddScoreComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})

export class AppRoutingModule {

}