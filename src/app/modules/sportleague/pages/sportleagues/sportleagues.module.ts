import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportleaguesComponent } from './sportleagues.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportleaguesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportleaguesComponent],
	providers: []
})
export class SportleaguesModule {}
