import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportachievementService } from '../../services/sportachievement.service';
import { Sportachievement } from '../../interfaces/sportachievement.interface';

@Component({
	selector: 'sportachievement-selector',
	templateUrl: './sportachievement-selector.component.html',
	styleUrls: ['./sportachievement-selector.component.scss'],
	imports: [SelectModule],
})
export class SportachievementSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportachievement[] {
		return this._sportachievementService.sportachievements;
	}

	constructor(private _sportachievementService: SportachievementService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
