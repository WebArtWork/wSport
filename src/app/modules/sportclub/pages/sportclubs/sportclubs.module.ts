import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportclubsComponent } from './sportclubs.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportclubsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportclubsComponent],
	providers: []
})
export class SportclubsModule {}
