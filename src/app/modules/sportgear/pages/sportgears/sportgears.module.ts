import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportgearsComponent } from './sportgears.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportgearsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportgearsComponent],
	providers: []
})
export class SportgearsModule {}
