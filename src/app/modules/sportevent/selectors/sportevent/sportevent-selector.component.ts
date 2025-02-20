import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SporteventService } from '../../services/sportevent.service';
import { Sportevent } from '../../interfaces/sportevent.interface';

@Component({
	selector: 'sportevent-selector',
	templateUrl: './sportevent-selector.component.html',
	styleUrls: ['./sportevent-selector.component.scss'],
	imports: [SelectModule],
})
export class SporteventSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportevent[] {
		return this._sporteventService.sportevents;
	}

	constructor(private _sporteventService: SporteventService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
