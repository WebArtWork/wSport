import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportcontractService } from '../../services/sportcontract.service';
import { Sportcontract } from '../../interfaces/sportcontract.interface';

@Component({
	selector: 'sportcontract-selector',
	templateUrl: './sportcontract-selector.component.html',
	styleUrls: ['./sportcontract-selector.component.scss'],
	imports: [SelectModule],
})
export class SportcontractSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportcontract[] {
		return this._sportcontractService.sportcontracts;
	}

	constructor(private _sportcontractService: SportcontractService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
