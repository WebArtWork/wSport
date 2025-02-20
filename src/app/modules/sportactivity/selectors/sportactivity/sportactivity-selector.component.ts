import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportactivityService } from '../../services/sportactivity.service';
import { Sportactivity } from '../../interfaces/sportactivity.interface';

@Component({
	selector: 'sportactivity-selector',
	templateUrl: './sportactivity-selector.component.html',
	styleUrls: ['./sportactivity-selector.component.scss'],
	imports: [SelectModule],
})
export class SportactivitySelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportactivity[] {
		return this._sportactivityService.sportactivitys;
	}

	constructor(private _sportactivityService: SportactivityService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
