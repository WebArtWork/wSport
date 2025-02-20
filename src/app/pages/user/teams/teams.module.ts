import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TeamsComponent } from './teams.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TeamsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TeamsComponent]
})
export class TeamsModule {}
