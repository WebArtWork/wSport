import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SporthealthService } from '../../services/sporthealth.service';
import { Sporthealth } from '../../interfaces/sporthealth.interface';

@Component({
	selector: 'sporthealth-selector',
	templateUrl: './sporthealth-selector.component.html',
	styleUrls: ['./sporthealth-selector.component.scss'],
	imports: [SelectModule],
})
export class SporthealthSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sporthealth[] {
		return this._sporthealthService.sporthealths;
	}

	constructor(private _sporthealthService: SporthealthService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
