import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportleagueService } from '../../services/sportleague.service';
import { Sportleague } from '../../interfaces/sportleague.interface';

@Component({
	selector: 'sportleague-selector',
	templateUrl: './sportleague-selector.component.html',
	styleUrls: ['./sportleague-selector.component.scss'],
	imports: [SelectModule],
})
export class SportleagueSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportleague[] {
		return this._sportleagueService.sportleagues;
	}

	constructor(private _sportleagueService: SportleagueService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
