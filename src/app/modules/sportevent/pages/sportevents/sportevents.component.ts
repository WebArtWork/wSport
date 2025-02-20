import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SporteventService } from '../../services/sportevent.service';
import { Sportevent } from '../../interfaces/sportevent.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sporteventFormComponents } from '../../formcomponents/sportevent.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportevents.component.html',
	styleUrls: ['./sportevents.component.scss'],
	standalone: false,
})
export class SporteventsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportevent', sporteventFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sporteventService.setPerPage.bind(this._sporteventService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportevent>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportevent);

					await firstValueFrom(
						this._sporteventService.create(created as Sportevent)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportevent): void => {
			this._form
				.modal<Sportevent>(this.form, [], doc)
				.then((updated: Sportevent) => {
					this._core.copy(updated, doc);

					this._sporteventService.update(doc);
				});
		},
		delete: (doc: Sportevent): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportevent?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sporteventService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportevent): void => {
					this._form.modalUnique<Sportevent>('sportevent', 'url', doc);
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

	rows: Sportevent[] = [];

	constructor(
		private _translate: TranslateService,
		private _sporteventService: SporteventService,
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
				this._sporteventService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportevent>(create ? [] : this.rows)
				.then(async (sportevents: Sportevent[]) => {
					if (create) {
						for (const sportevent of sportevents) {
							this._preCreate(sportevent);

							await firstValueFrom(
								this._sporteventService.create(sportevent)
							);
						}
					} else {
						for (const sportevent of this.rows) {
							if (
								!sportevents.find(
									(localSportevent) => localSportevent._id === sportevent._id
								)
							) {
								await firstValueFrom(
									this._sporteventService.delete(sportevent)
								);
							}
						}

						for (const sportevent of sportevents) {
							const localSportevent = this.rows.find(
								(localSportevent) => localSportevent._id === sportevent._id
							);

							if (localSportevent) {
								this._core.copy(sportevent, localSportevent);

								await firstValueFrom(
									this._sporteventService.update(localSportevent)
								);
							} else {
								this._preCreate(sportevent);

								await firstValueFrom(
									this._sporteventService.create(sportevent)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportevent: Sportevent): void {
		delete sportevent.__created;
	}
}
