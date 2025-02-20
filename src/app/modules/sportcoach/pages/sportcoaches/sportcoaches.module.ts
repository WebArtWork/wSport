import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportcoachesComponent } from './sportcoaches.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportcoachesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportcoachesComponent],
	providers: []
})
export class SportcoachesModule {}
