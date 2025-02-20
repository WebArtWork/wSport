import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CoachesComponent } from './coaches.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CoachesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CoachesComponent]
})
export class CoachesModule {}
