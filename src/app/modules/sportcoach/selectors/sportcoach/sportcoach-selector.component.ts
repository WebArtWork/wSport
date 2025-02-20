import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportcoachService } from '../../services/sportcoach.service';
import { Sportcoach } from '../../interfaces/sportcoach.interface';

@Component({
	selector: 'sportcoach-selector',
	templateUrl: './sportcoach-selector.component.html',
	styleUrls: ['./sportcoach-selector.component.scss'],
	imports: [SelectModule],
})
export class SportcoachSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportcoach[] {
		return this._sportcoachService.sportcoachs;
	}

	constructor(private _sportcoachService: SportcoachService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
