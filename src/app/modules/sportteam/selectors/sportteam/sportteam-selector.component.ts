import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportteamService } from '../../services/sportteam.service';
import { Sportteam } from '../../interfaces/sportteam.interface';

@Component({
	selector: 'sportteam-selector',
	templateUrl: './sportteam-selector.component.html',
	styleUrls: ['./sportteam-selector.component.scss'],
	imports: [SelectModule],
})
export class SportteamSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportteam[] {
		return this._sportteamService.sportteams;
	}

	constructor(private _sportteamService: SportteamService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
