import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportnutritionService } from '../../services/sportnutrition.service';
import { Sportnutrition } from '../../interfaces/sportnutrition.interface';

@Component({
	selector: 'sportnutrition-selector',
	templateUrl: './sportnutrition-selector.component.html',
	styleUrls: ['./sportnutrition-selector.component.scss'],
	imports: [SelectModule],
})
export class SportnutritionSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportnutrition[] {
		return this._sportnutritionService.sportnutritions;
	}

	constructor(private _sportnutritionService: SportnutritionService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
