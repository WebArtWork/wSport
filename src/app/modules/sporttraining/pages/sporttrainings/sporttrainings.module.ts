import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SporttrainingsComponent } from './sporttrainings.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SporttrainingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SporttrainingsComponent],
	providers: []
})
export class SporttrainingsModule {}
