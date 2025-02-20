import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FacilityComponent } from './facility.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FacilityComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FacilityComponent]
})
export class FacilityModule {}
