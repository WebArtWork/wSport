import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ContractComponent } from './contract.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ContractComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ContractComponent]
})
export class ContractModule {}
