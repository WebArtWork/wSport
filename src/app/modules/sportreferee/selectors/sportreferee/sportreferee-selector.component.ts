import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportrefereeService } from '../../services/sportreferee.service';
import { Sportreferee } from '../../interfaces/sportreferee.interface';

@Component({
	selector: 'sportreferee-selector',
	templateUrl: './sportreferee-selector.component.html',
	styleUrls: ['./sportreferee-selector.component.scss'],
	imports: [SelectModule],
})
export class SportrefereeSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportreferee[] {
		return this._sportrefereeService.sportreferees;
	}

	constructor(private _sportrefereeService: SportrefereeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
