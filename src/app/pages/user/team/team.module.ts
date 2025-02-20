import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TeamComponent } from './team.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TeamComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TeamComponent]
})
export class TeamModule {}
