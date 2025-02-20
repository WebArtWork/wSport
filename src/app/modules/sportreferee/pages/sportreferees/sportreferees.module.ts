import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SportrefereesComponent } from './sportreferees.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SportrefereesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SportrefereesComponent],
	providers: []
})
export class SportrefereesModule {}
