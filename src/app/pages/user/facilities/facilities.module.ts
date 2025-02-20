import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FacilitiesComponent } from './facilities.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FacilitiesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FacilitiesComponent]
})
export class FacilitiesModule {}
