import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TrainingsComponent } from './trainings.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TrainingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TrainingsComponent]
})
export class TrainingsModule {}
