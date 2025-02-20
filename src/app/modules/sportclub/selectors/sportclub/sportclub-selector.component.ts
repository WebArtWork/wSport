import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportclubService } from '../../services/sportclub.service';
import { Sportclub } from '../../interfaces/sportclub.interface';

@Component({
	selector: 'sportclub-selector',
	templateUrl: './sportclub-selector.component.html',
	styleUrls: ['./sportclub-selector.component.scss'],
	imports: [SelectModule],
})
export class SportclubSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportclub[] {
		return this._sportclubService.sportclubs;
	}

	constructor(private _sportclubService: SportclubService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
