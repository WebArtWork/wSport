import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { Gear-itemComponent } from './gear-item.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: Gear-itemComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [Gear-itemComponent]
})
export class Gear-itemModule {}
