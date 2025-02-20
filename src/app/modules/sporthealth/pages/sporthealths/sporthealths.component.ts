import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SporthealthService } from '../../services/sporthealth.service';
import { Sporthealth } from '../../interfaces/sporthealth.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sporthealthFormComponents } from '../../formcomponents/sporthealth.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sporthealths.component.html',
	styleUrls: ['./sporthealths.component.scss'],
	standalone: false,
})
export class SporthealthsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sporthealth', sporthealthFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sporthealthService.setPerPage.bind(this._sporthealthService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sporthealth>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sporthealth);

					await firstValueFrom(
						this._sporthealthService.create(created as Sporthealth)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sporthealth): void => {
			this._form
				.modal<Sporthealth>(this.form, [], doc)
				.then((updated: Sporthealth) => {
					this._core.copy(updated, doc);

					this._sporthealthService.update(doc);
				});
		},
		delete: (doc: Sporthealth): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sporthealth?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sporthealthService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sporthealth): void => {
					this._form.modalUnique<Sporthealth>('sporthealth', 'url', doc);
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

	rows: Sporthealth[] = [];

	constructor(
		private _translate: TranslateService,
		private _sporthealthService: SporthealthService,
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
				this._sporthealthService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sporthealth>(create ? [] : this.rows)
				.then(async (sporthealths: Sporthealth[]) => {
					if (create) {
						for (const sporthealth of sporthealths) {
							this._preCreate(sporthealth);

							await firstValueFrom(
								this._sporthealthService.create(sporthealth)
							);
						}
					} else {
						for (const sporthealth of this.rows) {
							if (
								!sporthealths.find(
									(localSporthealth) => localSporthealth._id === sporthealth._id
								)
							) {
								await firstValueFrom(
									this._sporthealthService.delete(sporthealth)
								);
							}
						}

						for (const sporthealth of sporthealths) {
							const localSporthealth = this.rows.find(
								(localSporthealth) => localSporthealth._id === sporthealth._id
							);

							if (localSporthealth) {
								this._core.copy(sporthealth, localSporthealth);

								await firstValueFrom(
									this._sporthealthService.update(localSporthealth)
								);
							} else {
								this._preCreate(sporthealth);

								await firstValueFrom(
									this._sporthealthService.create(sporthealth)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sporthealth: Sporthealth): void {
		delete sporthealth.__created;
	}
}
