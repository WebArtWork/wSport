import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MatchesComponent } from './matches.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MatchesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MatchesComponent]
})
export class MatchesModule {}
