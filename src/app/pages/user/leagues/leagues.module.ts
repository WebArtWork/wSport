import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { LeaguesComponent } from './leagues.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LeaguesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [LeaguesComponent]
})
export class LeaguesModule {}
