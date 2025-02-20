import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SporttrainingService } from '../../services/sporttraining.service';
import { Sporttraining } from '../../interfaces/sporttraining.interface';

@Component({
	selector: 'sporttraining-selector',
	templateUrl: './sporttraining-selector.component.html',
	styleUrls: ['./sporttraining-selector.component.scss'],
	imports: [SelectModule],
})
export class SporttrainingSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sporttraining[] {
		return this._sporttrainingService.sporttrainings;
	}

	constructor(private _sporttrainingService: SporttrainingService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
