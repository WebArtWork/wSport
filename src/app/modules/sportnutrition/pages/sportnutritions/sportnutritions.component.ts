import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportnutritionService } from '../../services/sportnutrition.service';
import { Sportnutrition } from '../../interfaces/sportnutrition.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportnutritionFormComponents } from '../../formcomponents/sportnutrition.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportnutritions.component.html',
	styleUrls: ['./sportnutritions.component.scss'],
	standalone: false,
})
export class SportnutritionsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportnutrition', sportnutritionFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportnutritionService.setPerPage.bind(this._sportnutritionService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportnutrition>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportnutrition);

					await firstValueFrom(
						this._sportnutritionService.create(created as Sportnutrition)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportnutrition): void => {
			this._form
				.modal<Sportnutrition>(this.form, [], doc)
				.then((updated: Sportnutrition) => {
					this._core.copy(updated, doc);

					this._sportnutritionService.update(doc);
				});
		},
		delete: (doc: Sportnutrition): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportnutrition?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportnutritionService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportnutrition): void => {
					this._form.modalUnique<Sportnutrition>('sportnutrition', 'url', doc);
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

	rows: Sportnutrition[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportnutritionService: SportnutritionService,
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
				this._sportnutritionService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportnutrition>(create ? [] : this.rows)
				.then(async (sportnutritions: Sportnutrition[]) => {
					if (create) {
						for (const sportnutrition of sportnutritions) {
							this._preCreate(sportnutrition);

							await firstValueFrom(
								this._sportnutritionService.create(sportnutrition)
							);
						}
					} else {
						for (const sportnutrition of this.rows) {
							if (
								!sportnutritions.find(
									(localSportnutrition) => localSportnutrition._id === sportnutrition._id
								)
							) {
								await firstValueFrom(
									this._sportnutritionService.delete(sportnutrition)
								);
							}
						}

						for (const sportnutrition of sportnutritions) {
							const localSportnutrition = this.rows.find(
								(localSportnutrition) => localSportnutrition._id === sportnutrition._id
							);

							if (localSportnutrition) {
								this._core.copy(sportnutrition, localSportnutrition);

								await firstValueFrom(
									this._sportnutritionService.update(localSportnutrition)
								);
							} else {
								this._preCreate(sportnutrition);

								await firstValueFrom(
									this._sportnutritionService.create(sportnutrition)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportnutrition: Sportnutrition): void {
		delete sportnutrition.__created;
	}
}
