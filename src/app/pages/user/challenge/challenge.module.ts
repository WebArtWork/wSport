import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ChallengeComponent } from './challenge.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ChallengeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ChallengeComponent]
})
export class ChallengeModule {}
