import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportrefereeService } from '../../services/sportreferee.service';
import { Sportreferee } from '../../interfaces/sportreferee.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportrefereeFormComponents } from '../../formcomponents/sportreferee.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportreferees.component.html',
	styleUrls: ['./sportreferees.component.scss'],
	standalone: false,
})
export class SportrefereesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportreferee', sportrefereeFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportrefereeService.setPerPage.bind(this._sportrefereeService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportreferee>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportreferee);

					await firstValueFrom(
						this._sportrefereeService.create(created as Sportreferee)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportreferee): void => {
			this._form
				.modal<Sportreferee>(this.form, [], doc)
				.then((updated: Sportreferee) => {
					this._core.copy(updated, doc);

					this._sportrefereeService.update(doc);
				});
		},
		delete: (doc: Sportreferee): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportreferee?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportrefereeService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportreferee): void => {
					this._form.modalUnique<Sportreferee>('sportreferee', 'url', doc);
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

	rows: Sportreferee[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportrefereeService: SportrefereeService,
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
				this._sportrefereeService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportreferee>(create ? [] : this.rows)
				.then(async (sportreferees: Sportreferee[]) => {
					if (create) {
						for (const sportreferee of sportreferees) {
							this._preCreate(sportreferee);

							await firstValueFrom(
								this._sportrefereeService.create(sportreferee)
							);
						}
					} else {
						for (const sportreferee of this.rows) {
							if (
								!sportreferees.find(
									(localSportreferee) => localSportreferee._id === sportreferee._id
								)
							) {
								await firstValueFrom(
									this._sportrefereeService.delete(sportreferee)
								);
							}
						}

						for (const sportreferee of sportreferees) {
							const localSportreferee = this.rows.find(
								(localSportreferee) => localSportreferee._id === sportreferee._id
							);

							if (localSportreferee) {
								this._core.copy(sportreferee, localSportreferee);

								await firstValueFrom(
									this._sportrefereeService.update(localSportreferee)
								);
							} else {
								this._preCreate(sportreferee);

								await firstValueFrom(
									this._sportrefereeService.create(sportreferee)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportreferee: Sportreferee): void {
		delete sportreferee.__created;
	}
}
