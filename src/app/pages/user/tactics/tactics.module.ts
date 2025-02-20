import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TacticsComponent } from './tactics.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TacticsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TacticsComponent]
})
export class TacticsModule {}
