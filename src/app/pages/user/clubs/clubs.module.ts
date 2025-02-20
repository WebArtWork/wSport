import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClubsComponent } from './clubs.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ClubsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ClubsComponent]
})
export class ClubsModule {}
