import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportteamsComponent } from './sportteams.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportteamsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportteamsComponent],
	providers: []
})
export class SportteamsModule {}
