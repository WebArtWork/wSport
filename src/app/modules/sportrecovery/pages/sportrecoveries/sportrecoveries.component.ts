import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportrecoveryService } from '../../services/sportrecovery.service';
import { Sportrecovery } from '../../interfaces/sportrecovery.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportrecoveryFormComponents } from '../../formcomponents/sportrecovery.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportrecoveries.component.html',
	styleUrls: ['./sportrecoveries.component.scss'],
	standalone: false,
})
export class SportrecoveriesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportrecovery', sportrecoveryFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportrecoveryService.setPerPage.bind(this._sportrecoveryService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportrecovery>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportrecovery);

					await firstValueFrom(
						this._sportrecoveryService.create(created as Sportrecovery)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportrecovery): void => {
			this._form
				.modal<Sportrecovery>(this.form, [], doc)
				.then((updated: Sportrecovery) => {
					this._core.copy(updated, doc);

					this._sportrecoveryService.update(doc);
				});
		},
		delete: (doc: Sportrecovery): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportrecovery?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportrecoveryService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportrecovery): void => {
					this._form.modalUnique<Sportrecovery>('sportrecovery', 'url', doc);
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

	rows: Sportrecovery[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportrecoveryService: SportrecoveryService,
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
				this._sportrecoveryService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportrecovery>(create ? [] : this.rows)
				.then(async (sportrecoverys: Sportrecovery[]) => {
					if (create) {
						for (const sportrecovery of sportrecoverys) {
							this._preCreate(sportrecovery);

							await firstValueFrom(
								this._sportrecoveryService.create(sportrecovery)
							);
						}
					} else {
						for (const sportrecovery of this.rows) {
							if (
								!sportrecoverys.find(
									(localSportrecovery) => localSportrecovery._id === sportrecovery._id
								)
							) {
								await firstValueFrom(
									this._sportrecoveryService.delete(sportrecovery)
								);
							}
						}

						for (const sportrecovery of sportrecoverys) {
							const localSportrecovery = this.rows.find(
								(localSportrecovery) => localSportrecovery._id === sportrecovery._id
							);

							if (localSportrecovery) {
								this._core.copy(sportrecovery, localSportrecovery);

								await firstValueFrom(
									this._sportrecoveryService.update(localSportrecovery)
								);
							} else {
								this._preCreate(sportrecovery);

								await firstValueFrom(
									this._sportrecoveryService.create(sportrecovery)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportrecovery: Sportrecovery): void {
		delete sportrecovery.__created;
	}
}
