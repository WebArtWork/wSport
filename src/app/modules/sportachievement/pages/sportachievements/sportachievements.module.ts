import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportachievementsComponent } from './sportachievements.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportachievementsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportachievementsComponent],
	providers: []
})
export class SportachievementsModule {}
