import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { LeagueComponent } from './league.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LeagueComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [LeagueComponent]
})
export class LeagueModule {}
