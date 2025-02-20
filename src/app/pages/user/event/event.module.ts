import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { EventComponent } from './event.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: EventComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [EventComponent]
})
export class EventModule {}
