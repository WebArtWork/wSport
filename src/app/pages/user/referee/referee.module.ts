import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { RefereeComponent } from './referee.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: RefereeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [RefereeComponent]
})
export class RefereeModule {}
