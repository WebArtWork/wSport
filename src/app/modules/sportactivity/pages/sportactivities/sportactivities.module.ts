import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportactivitiesComponent } from './sportactivities.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportactivitiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportactivitiesComponent],
	providers: []
})
export class SportactivitiesModule {}
