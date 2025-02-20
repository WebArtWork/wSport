import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportnutritionsComponent } from './sportnutritions.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportnutritionsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportnutritionsComponent],
	providers: []
})
export class SportnutritionsModule {}
