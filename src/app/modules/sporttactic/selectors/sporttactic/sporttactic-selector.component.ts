import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SporttacticService } from '../../services/sporttactic.service';
import { Sporttactic } from '../../interfaces/sporttactic.interface';

@Component({
	selector: 'sporttactic-selector',
	templateUrl: './sporttactic-selector.component.html',
	styleUrls: ['./sporttactic-selector.component.scss'],
	imports: [SelectModule],
})
export class SporttacticSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sporttactic[] {
		return this._sporttacticService.sporttactics;
	}

	constructor(private _sporttacticService: SporttacticService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
