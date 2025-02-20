import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportfacilityService } from '../../services/sportfacility.service';
import { Sportfacility } from '../../interfaces/sportfacility.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportfacilityFormComponents } from '../../formcomponents/sportfacility.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportfacilities.component.html',
	styleUrls: ['./sportfacilities.component.scss'],
	standalone: false,
})
export class SportfacilitiesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportfacility', sportfacilityFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportfacilityService.setPerPage.bind(this._sportfacilityService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportfacility>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportfacility);

					await firstValueFrom(
						this._sportfacilityService.create(created as Sportfacility)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportfacility): void => {
			this._form
				.modal<Sportfacility>(this.form, [], doc)
				.then((updated: Sportfacility) => {
					this._core.copy(updated, doc);

					this._sportfacilityService.update(doc);
				});
		},
		delete: (doc: Sportfacility): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportfacility?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportfacilityService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportfacility): void => {
					this._form.modalUnique<Sportfacility>('sportfacility', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Sportfacility[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportfacilityService: SportfacilityService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._sportfacilityService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Sportfacility>(create ? [] : this.rows)
				.then(async (sportfacilitys: Sportfacility[]) => {
					if (create) {
						for (const sportfacility of sportfacilitys) {
							this._preCreate(sportfacility);

							await firstValueFrom(
								this._sportfacilityService.create(sportfacility)
							);
						}
					} else {
						for (const sportfacility of this.rows) {
							if (
								!sportfacilitys.find(
									(localSportfacility) => localSportfacility._id === sportfacility._id
								)
							) {
								await firstValueFrom(
									this._sportfacilityService.delete(sportfacility)
								);
							}
						}

						for (const sportfacility of sportfacilitys) {
							const localSportfacility = this.rows.find(
								(localSportfacility) => localSportfacility._id === sportfacility._id
							);

							if (localSportfacility) {
								this._core.copy(sportfacility, localSportfacility);

								await firstValueFrom(
									this._sportfacilityService.update(localSportfacility)
								);
							} else {
								this._preCreate(sportfacility);

								await firstValueFrom(
									this._sportfacilityService.create(sportfacility)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportfacility: Sportfacility): void {
		delete sportfacility.__created;
	}
}
