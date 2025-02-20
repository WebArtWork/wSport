import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportchallengeService } from '../../services/sportchallenge.service';
import { Sportchallenge } from '../../interfaces/sportchallenge.interface';

@Component({
	selector: 'sportchallenge-selector',
	templateUrl: './sportchallenge-selector.component.html',
	styleUrls: ['./sportchallenge-selector.component.scss'],
	imports: [SelectModule],
})
export class SportchallengeSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportchallenge[] {
		return this._sportchallengeService.sportchallenges;
	}

	constructor(private _sportchallengeService: SportchallengeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
