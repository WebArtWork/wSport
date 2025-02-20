import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportmatchesComponent } from './sportmatches.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportmatchesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportmatchesComponent],
	providers: []
})
export class SportmatchesModule {}
