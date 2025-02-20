import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { GearComponent } from './gear.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: GearComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [GearComponent]
})
export class GearModule {}
