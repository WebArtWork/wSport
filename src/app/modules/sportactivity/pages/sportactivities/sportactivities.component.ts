import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportactivityService } from '../../services/sportactivity.service';
import { Sportactivity } from '../../interfaces/sportactivity.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportactivityFormComponents } from '../../formcomponents/sportactivity.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportactivities.component.html',
	styleUrls: ['./sportactivities.component.scss'],
	standalone: false,
})
export class SportactivitiesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportactivity', sportactivityFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportactivityService.setPerPage.bind(this._sportactivityService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportactivity>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportactivity);

					await firstValueFrom(
						this._sportactivityService.create(created as Sportactivity)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportactivity): void => {
			this._form
				.modal<Sportactivity>(this.form, [], doc)
				.then((updated: Sportactivity) => {
					this._core.copy(updated, doc);

					this._sportactivityService.update(doc);
				});
		},
		delete: (doc: Sportactivity): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportactivity?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportactivityService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportactivity): void => {
					this._form.modalUnique<Sportactivity>('sportactivity', 'url', doc);
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

	rows: Sportactivity[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportactivityService: SportactivityService,
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
				this._sportactivityService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportactivity>(create ? [] : this.rows)
				.then(async (sportactivitys: Sportactivity[]) => {
					if (create) {
						for (const sportactivity of sportactivitys) {
							this._preCreate(sportactivity);

							await firstValueFrom(
								this._sportactivityService.create(sportactivity)
							);
						}
					} else {
						for (const sportactivity of this.rows) {
							if (
								!sportactivitys.find(
									(localSportactivity) => localSportactivity._id === sportactivity._id
								)
							) {
								await firstValueFrom(
									this._sportactivityService.delete(sportactivity)
								);
							}
						}

						for (const sportactivity of sportactivitys) {
							const localSportactivity = this.rows.find(
								(localSportactivity) => localSportactivity._id === sportactivity._id
							);

							if (localSportactivity) {
								this._core.copy(sportactivity, localSportactivity);

								await firstValueFrom(
									this._sportactivityService.update(localSportactivity)
								);
							} else {
								this._preCreate(sportactivity);

								await firstValueFrom(
									this._sportactivityService.create(sportactivity)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportactivity: Sportactivity): void {
		delete sportactivity.__created;
	}
}
