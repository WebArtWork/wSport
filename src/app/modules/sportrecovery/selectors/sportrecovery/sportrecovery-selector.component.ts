import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportrecoveryService } from '../../services/sportrecovery.service';
import { Sportrecovery } from '../../interfaces/sportrecovery.interface';

@Component({
	selector: 'sportrecovery-selector',
	templateUrl: './sportrecovery-selector.component.html',
	styleUrls: ['./sportrecovery-selector.component.scss'],
	imports: [SelectModule],
})
export class SportrecoverySelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportrecovery[] {
		return this._sportrecoveryService.sportrecoverys;
	}

	constructor(private _sportrecoveryService: SportrecoveryService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
