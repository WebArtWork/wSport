import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportrecoveriesComponent } from './sportrecoveries.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportrecoveriesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportrecoveriesComponent],
	providers: []
})
export class SportrecoveriesModule {}
