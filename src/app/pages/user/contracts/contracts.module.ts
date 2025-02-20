import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ContractsComponent } from './contracts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ContractsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ContractsComponent]
})
export class ContractsModule {}
