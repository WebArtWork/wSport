import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CoachComponent } from './coach.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CoachComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CoachComponent]
})
export class CoachModule {}
