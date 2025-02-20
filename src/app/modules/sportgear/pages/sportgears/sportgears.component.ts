import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportgearService } from '../../services/sportgear.service';
import { Sportgear } from '../../interfaces/sportgear.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportgearFormComponents } from '../../formcomponents/sportgear.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportgears.component.html',
	styleUrls: ['./sportgears.component.scss'],
	standalone: false,
})
export class SportgearsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportgear', sportgearFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportgearService.setPerPage.bind(this._sportgearService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportgear>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportgear);

					await firstValueFrom(
						this._sportgearService.create(created as Sportgear)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportgear): void => {
			this._form
				.modal<Sportgear>(this.form, [], doc)
				.then((updated: Sportgear) => {
					this._core.copy(updated, doc);

					this._sportgearService.update(doc);
				});
		},
		delete: (doc: Sportgear): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportgear?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportgearService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportgear): void => {
					this._form.modalUnique<Sportgear>('sportgear', 'url', doc);
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

	rows: Sportgear[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportgearService: SportgearService,
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
				this._sportgearService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportgear>(create ? [] : this.rows)
				.then(async (sportgears: Sportgear[]) => {
					if (create) {
						for (const sportgear of sportgears) {
							this._preCreate(sportgear);

							await firstValueFrom(
								this._sportgearService.create(sportgear)
							);
						}
					} else {
						for (const sportgear of this.rows) {
							if (
								!sportgears.find(
									(localSportgear) => localSportgear._id === sportgear._id
								)
							) {
								await firstValueFrom(
									this._sportgearService.delete(sportgear)
								);
							}
						}

						for (const sportgear of sportgears) {
							const localSportgear = this.rows.find(
								(localSportgear) => localSportgear._id === sportgear._id
							);

							if (localSportgear) {
								this._core.copy(sportgear, localSportgear);

								await firstValueFrom(
									this._sportgearService.update(localSportgear)
								);
							} else {
								this._preCreate(sportgear);

								await firstValueFrom(
									this._sportgearService.create(sportgear)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportgear: Sportgear): void {
		delete sportgear.__created;
	}
}
