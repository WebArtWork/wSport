import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SporttacticService } from '../../services/sporttactic.service';
import { Sporttactic } from '../../interfaces/sporttactic.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sporttacticFormComponents } from '../../formcomponents/sporttactic.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sporttactics.component.html',
	styleUrls: ['./sporttactics.component.scss'],
	standalone: false,
})
export class SporttacticsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sporttactic', sporttacticFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sporttacticService.setPerPage.bind(this._sporttacticService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sporttactic>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sporttactic);

					await firstValueFrom(
						this._sporttacticService.create(created as Sporttactic)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sporttactic): void => {
			this._form
				.modal<Sporttactic>(this.form, [], doc)
				.then((updated: Sporttactic) => {
					this._core.copy(updated, doc);

					this._sporttacticService.update(doc);
				});
		},
		delete: (doc: Sporttactic): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sporttactic?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sporttacticService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sporttactic): void => {
					this._form.modalUnique<Sporttactic>('sporttactic', 'url', doc);
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

	rows: Sporttactic[] = [];

	constructor(
		private _translate: TranslateService,
		private _sporttacticService: SporttacticService,
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
				this._sporttacticService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sporttactic>(create ? [] : this.rows)
				.then(async (sporttactics: Sporttactic[]) => {
					if (create) {
						for (const sporttactic of sporttactics) {
							this._preCreate(sporttactic);

							await firstValueFrom(
								this._sporttacticService.create(sporttactic)
							);
						}
					} else {
						for (const sporttactic of this.rows) {
							if (
								!sporttactics.find(
									(localSporttactic) => localSporttactic._id === sporttactic._id
								)
							) {
								await firstValueFrom(
									this._sporttacticService.delete(sporttactic)
								);
							}
						}

						for (const sporttactic of sporttactics) {
							const localSporttactic = this.rows.find(
								(localSporttactic) => localSporttactic._id === sporttactic._id
							);

							if (localSporttactic) {
								this._core.copy(sporttactic, localSporttactic);

								await firstValueFrom(
									this._sporttacticService.update(localSporttactic)
								);
							} else {
								this._preCreate(sporttactic);

								await firstValueFrom(
									this._sporttacticService.create(sporttactic)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sporttactic: Sporttactic): void {
		delete sporttactic.__created;
	}
}
