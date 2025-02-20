import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PlayersComponent } from './players.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PlayersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PlayersComponent]
})
export class PlayersModule {}
