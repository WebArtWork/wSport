import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SporteventsComponent } from './sportevents.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SporteventsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SporteventsComponent],
	providers: []
})
export class SporteventsModule {}
