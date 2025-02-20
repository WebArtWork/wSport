import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TrainingComponent } from './training.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TrainingComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TrainingComponent]
})
export class TrainingModule {}
