import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MatchComponent } from './match.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MatchComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MatchComponent]
})
export class MatchModule {}
