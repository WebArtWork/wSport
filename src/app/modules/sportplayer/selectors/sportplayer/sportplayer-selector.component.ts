import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { SportplayerService } from '../../services/sportplayer.service';
import { Sportplayer } from '../../interfaces/sportplayer.interface';

@Component({
	selector: 'sportplayer-selector',
	templateUrl: './sportplayer-selector.component.html',
	styleUrls: ['./sportplayer-selector.component.scss'],
	imports: [SelectModule],
})
export class SportplayerSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Sportplayer[] {
		return this._sportplayerService.sportplayers;
	}

	constructor(private _sportplayerService: SportplayerService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
