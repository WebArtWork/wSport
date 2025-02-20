import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportachievementService } from '../../services/sportachievement.service';
import { Sportachievement } from '../../interfaces/sportachievement.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportachievementFormComponents } from '../../formcomponents/sportachievement.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportachievements.component.html',
	styleUrls: ['./sportachievements.component.scss'],
	standalone: false,
})
export class SportachievementsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportachievement', sportachievementFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportachievementService.setPerPage.bind(this._sportachievementService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportachievement>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportachievement);

					await firstValueFrom(
						this._sportachievementService.create(created as Sportachievement)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportachievement): void => {
			this._form
				.modal<Sportachievement>(this.form, [], doc)
				.then((updated: Sportachievement) => {
					this._core.copy(updated, doc);

					this._sportachievementService.update(doc);
				});
		},
		delete: (doc: Sportachievement): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportachievement?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportachievementService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportachievement): void => {
					this._form.modalUnique<Sportachievement>('sportachievement', 'url', doc);
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

	rows: Sportachievement[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportachievementService: SportachievementService,
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
				this._sportachievementService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportachievement>(create ? [] : this.rows)
				.then(async (sportachievements: Sportachievement[]) => {
					if (create) {
						for (const sportachievement of sportachievements) {
							this._preCreate(sportachievement);

							await firstValueFrom(
								this._sportachievementService.create(sportachievement)
							);
						}
					} else {
						for (const sportachievement of this.rows) {
							if (
								!sportachievements.find(
									(localSportachievement) => localSportachievement._id === sportachievement._id
								)
							) {
								await firstValueFrom(
									this._sportachievementService.delete(sportachievement)
								);
							}
						}

						for (const sportachievement of sportachievements) {
							const localSportachievement = this.rows.find(
								(localSportachievement) => localSportachievement._id === sportachievement._id
							);

							if (localSportachievement) {
								this._core.copy(sportachievement, localSportachievement);

								await firstValueFrom(
									this._sportachievementService.update(localSportachievement)
								);
							} else {
								this._preCreate(sportachievement);

								await firstValueFrom(
									this._sportachievementService.create(sportachievement)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportachievement: Sportachievement): void {
		delete sportachievement.__created;
	}
}
