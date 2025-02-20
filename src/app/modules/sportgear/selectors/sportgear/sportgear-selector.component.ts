import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportgearService } from '../../services/sportgear.service';
import { Sportgear } from '../../interfaces/sportgear.interface';

@Component({
	selector: 'sportgear-selector',
	templateUrl: './sportgear-selector.component.html',
	styleUrls: ['./sportgear-selector.component.scss'],
	imports: [SelectModule],
})
export class SportgearSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportgear[] {
		return this._sportgearService.sportgears;
	}

	constructor(private _sportgearService: SportgearService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
