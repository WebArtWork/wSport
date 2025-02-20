import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ChallengesComponent } from './challenges.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ChallengesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ChallengesComponent]
})
export class ChallengesModule {}
