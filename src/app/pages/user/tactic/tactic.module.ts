import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TacticComponent } from './tactic.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TacticComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TacticComponent]
})
export class TacticModule {}
