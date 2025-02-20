import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportmatchService } from '../../services/sportmatch.service';
import { Sportmatch } from '../../interfaces/sportmatch.interface';

@Component({
	selector: 'sportmatch-selector',
	templateUrl: './sportmatch-selector.component.html',
	styleUrls: ['./sportmatch-selector.component.scss'],
	imports: [SelectModule],
})
export class SportmatchSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportmatch[] {
		return this._sportmatchService.sportmatchs;
	}

	constructor(private _sportmatchService: SportmatchService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
