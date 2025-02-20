import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SporttrainingService } from '../../services/sporttraining.service';
import { Sporttraining } from '../../interfaces/sporttraining.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sporttrainingFormComponents } from '../../formcomponents/sporttraining.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sporttrainings.component.html',
	styleUrls: ['./sporttrainings.component.scss'],
	standalone: false,
})
export class SporttrainingsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sporttraining', sporttrainingFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sporttrainingService.setPerPage.bind(this._sporttrainingService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sporttraining>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sporttraining);

					await firstValueFrom(
						this._sporttrainingService.create(created as Sporttraining)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sporttraining): void => {
			this._form
				.modal<Sporttraining>(this.form, [], doc)
				.then((updated: Sporttraining) => {
					this._core.copy(updated, doc);

					this._sporttrainingService.update(doc);
				});
		},
		delete: (doc: Sporttraining): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sporttraining?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sporttrainingService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sporttraining): void => {
					this._form.modalUnique<Sporttraining>('sporttraining', 'url', doc);
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

	rows: Sporttraining[] = [];

	constructor(
		private _translate: TranslateService,
		private _sporttrainingService: SporttrainingService,
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
				this._sporttrainingService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sporttraining>(create ? [] : this.rows)
				.then(async (sporttrainings: Sporttraining[]) => {
					if (create) {
						for (const sporttraining of sporttrainings) {
							this._preCreate(sporttraining);

							await firstValueFrom(
								this._sporttrainingService.create(sporttraining)
							);
						}
					} else {
						for (const sporttraining of this.rows) {
							if (
								!sporttrainings.find(
									(localSporttraining) => localSporttraining._id === sporttraining._id
								)
							) {
								await firstValueFrom(
									this._sporttrainingService.delete(sporttraining)
								);
							}
						}

						for (const sporttraining of sporttrainings) {
							const localSporttraining = this.rows.find(
								(localSporttraining) => localSporttraining._id === sporttraining._id
							);

							if (localSporttraining) {
								this._core.copy(sporttraining, localSporttraining);

								await firstValueFrom(
									this._sporttrainingService.update(localSporttraining)
								);
							} else {
								this._preCreate(sporttraining);

								await firstValueFrom(
									this._sporttrainingService.create(sporttraining)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sporttraining: Sporttraining): void {
		delete sporttraining.__created;
	}
}
