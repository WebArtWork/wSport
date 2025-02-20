import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { RefereesComponent } from './referees.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: RefereesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [RefereesComponent]
})
export class RefereesModule {}
