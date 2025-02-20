import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportfacilityService } from '../../services/sportfacility.service';
import { Sportfacility } from '../../interfaces/sportfacility.interface';

@Component({
	selector: 'sportfacility-selector',
	templateUrl: './sportfacility-selector.component.html',
	styleUrls: ['./sportfacility-selector.component.scss'],
	imports: [SelectModule],
})
export class SportfacilitySelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportfacility[] {
		return this._sportfacilityService.sportfacilitys;
	}

	constructor(private _sportfacilityService: SportfacilityService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
