import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportfacilitiesComponent } from './sportfacilities.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportfacilitiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportfacilitiesComponent],
	providers: []
})
export class SportfacilitiesModule {}
