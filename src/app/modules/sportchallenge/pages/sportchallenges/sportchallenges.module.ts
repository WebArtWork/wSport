import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportchallengesComponent } from './sportchallenges.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportchallengesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportchallengesComponent],
	providers: []
})
export class SportchallengesModule {}
