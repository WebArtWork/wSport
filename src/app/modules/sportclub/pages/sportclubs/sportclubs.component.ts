import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportclubService } from '../../services/sportclub.service';
import { Sportclub } from '../../interfaces/sportclub.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportclubFormComponents } from '../../formcomponents/sportclub.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportclubs.component.html',
	styleUrls: ['./sportclubs.component.scss'],
	standalone: false,
})
export class SportclubsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportclub', sportclubFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportclubService.setPerPage.bind(this._sportclubService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportclub>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportclub);

					await firstValueFrom(
						this._sportclubService.create(created as Sportclub)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportclub): void => {
			this._form
				.modal<Sportclub>(this.form, [], doc)
				.then((updated: Sportclub) => {
					this._core.copy(updated, doc);

					this._sportclubService.update(doc);
				});
		},
		delete: (doc: Sportclub): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportclub?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportclubService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportclub): void => {
					this._form.modalUnique<Sportclub>('sportclub', 'url', doc);
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

	rows: Sportclub[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportclubService: SportclubService,
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
				this._sportclubService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportclub>(create ? [] : this.rows)
				.then(async (sportclubs: Sportclub[]) => {
					if (create) {
						for (const sportclub of sportclubs) {
							this._preCreate(sportclub);

							await firstValueFrom(
								this._sportclubService.create(sportclub)
							);
						}
					} else {
						for (const sportclub of this.rows) {
							if (
								!sportclubs.find(
									(localSportclub) => localSportclub._id === sportclub._id
								)
							) {
								await firstValueFrom(
									this._sportclubService.delete(sportclub)
								);
							}
						}

						for (const sportclub of sportclubs) {
							const localSportclub = this.rows.find(
								(localSportclub) => localSportclub._id === sportclub._id
							);

							if (localSportclub) {
								this._core.copy(sportclub, localSportclub);

								await firstValueFrom(
									this._sportclubService.update(localSportclub)
								);
							} else {
								this._preCreate(sportclub);

								await firstValueFrom(
									this._sportclubService.create(sportclub)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportclub: Sportclub): void {
		delete sportclub.__created;
	}
}
