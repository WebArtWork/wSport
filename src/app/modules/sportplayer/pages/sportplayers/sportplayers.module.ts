import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportplayersComponent } from './sportplayers.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportplayersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportplayersComponent],
	providers: []
})
export class SportplayersModule {}
