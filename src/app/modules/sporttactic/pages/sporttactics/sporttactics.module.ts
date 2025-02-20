import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SporttacticsComponent } from './sporttactics.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SporttacticsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SporttacticsComponent],
	providers: []
})
export class SporttacticsModule {}
