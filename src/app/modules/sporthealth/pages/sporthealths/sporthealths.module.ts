import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SporthealthsComponent } from './sporthealths.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SporthealthsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SporthealthsComponent],
	providers: []
})
export class SporthealthsModule {}
