import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportcontractsComponent } from './sportcontracts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportcontractsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportcontractsComponent],
	providers: []
})
export class SportcontractsModule {}
