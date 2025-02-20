import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportcontractService } from '../../services/sportcontract.service';
import { Sportcontract } from '../../interfaces/sportcontract.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportcontractFormComponents } from '../../formcomponents/sportcontract.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportcontracts.component.html',
	styleUrls: ['./sportcontracts.component.scss'],
	standalone: false,
})
export class SportcontractsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportcontract', sportcontractFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportcontractService.setPerPage.bind(this._sportcontractService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportcontract>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportcontract);

					await firstValueFrom(
						this._sportcontractService.create(created as Sportcontract)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportcontract): void => {
			this._form
				.modal<Sportcontract>(this.form, [], doc)
				.then((updated: Sportcontract) => {
					this._core.copy(updated, doc);

					this._sportcontractService.update(doc);
				});
		},
		delete: (doc: Sportcontract): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportcontract?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportcontractService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportcontract): void => {
					this._form.modalUnique<Sportcontract>('sportcontract', 'url', doc);
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

	rows: Sportcontract[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportcontractService: SportcontractService,
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
				this._sportcontractService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportcontract>(create ? [] : this.rows)
				.then(async (sportcontracts: Sportcontract[]) => {
					if (create) {
						for (const sportcontract of sportcontracts) {
							this._preCreate(sportcontract);

							await firstValueFrom(
								this._sportcontractService.create(sportcontract)
							);
						}
					} else {
						for (const sportcontract of this.rows) {
							if (
								!sportcontracts.find(
									(localSportcontract) => localSportcontract._id === sportcontract._id
								)
							) {
								await firstValueFrom(
									this._sportcontractService.delete(sportcontract)
								);
							}
						}

						for (const sportcontract of sportcontracts) {
							const localSportcontract = this.rows.find(
								(localSportcontract) => localSportcontract._id === sportcontract._id
							);

							if (localSportcontract) {
								this._core.copy(sportcontract, localSportcontract);

								await firstValueFrom(
									this._sportcontractService.update(localSportcontract)
								);
							} else {
								this._preCreate(sportcontract);

								await firstValueFrom(
									this._sportcontractService.create(sportcontract)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportcontract: Sportcontract): void {
		delete sportcontract.__created;
	}
}
