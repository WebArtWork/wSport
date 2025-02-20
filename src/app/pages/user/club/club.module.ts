import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ClubComponent } from './club.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ClubComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ClubComponent]
})
export class ClubModule {}
