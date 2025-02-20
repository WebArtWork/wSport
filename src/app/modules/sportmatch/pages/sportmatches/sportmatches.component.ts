import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportmatchService } from '../../services/sportmatch.service';
import { Sportmatch } from '../../interfaces/sportmatch.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportmatchFormComponents } from '../../formcomponents/sportmatch.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportmatches.component.html',
	styleUrls: ['./sportmatches.component.scss'],
	standalone: false,
})
export class SportmatchesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportmatch', sportmatchFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportmatchService.setPerPage.bind(this._sportmatchService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportmatch>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportmatch);

					await firstValueFrom(
						this._sportmatchService.create(created as Sportmatch)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportmatch): void => {
			this._form
				.modal<Sportmatch>(this.form, [], doc)
				.then((updated: Sportmatch) => {
					this._core.copy(updated, doc);

					this._sportmatchService.update(doc);
				});
		},
		delete: (doc: Sportmatch): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportmatch?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportmatchService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportmatch): void => {
					this._form.modalUnique<Sportmatch>('sportmatch', 'url', doc);
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

	rows: Sportmatch[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportmatchService: SportmatchService,
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
				this._sportmatchService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportmatch>(create ? [] : this.rows)
				.then(async (sportmatchs: Sportmatch[]) => {
					if (create) {
						for (const sportmatch of sportmatchs) {
							this._preCreate(sportmatch);

							await firstValueFrom(
								this._sportmatchService.create(sportmatch)
							);
						}
					} else {
						for (const sportmatch of this.rows) {
							if (
								!sportmatchs.find(
									(localSportmatch) => localSportmatch._id === sportmatch._id
								)
							) {
								await firstValueFrom(
									this._sportmatchService.delete(sportmatch)
								);
							}
						}

						for (const sportmatch of sportmatchs) {
							const localSportmatch = this.rows.find(
								(localSportmatch) => localSportmatch._id === sportmatch._id
							);

							if (localSportmatch) {
								this._core.copy(sportmatch, localSportmatch);

								await firstValueFrom(
									this._sportmatchService.update(localSportmatch)
								);
							} else {
								this._preCreate(sportmatch);

								await firstValueFrom(
									this._sportmatchService.create(sportmatch)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportmatch: Sportmatch): void {
		delete sportmatch.__created;
	}
}
