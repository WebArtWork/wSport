import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportcoachService } from '../../services/sportcoach.service';
import { Sportcoach } from '../../interfaces/sportcoach.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportcoachFormComponents } from '../../formcomponents/sportcoach.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportcoaches.component.html',
	styleUrls: ['./sportcoaches.component.scss'],
	standalone: false,
})
export class SportcoachesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportcoach', sportcoachFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportcoachService.setPerPage.bind(this._sportcoachService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportcoach>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportcoach);

					await firstValueFrom(
						this._sportcoachService.create(created as Sportcoach)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportcoach): void => {
			this._form
				.modal<Sportcoach>(this.form, [], doc)
				.then((updated: Sportcoach) => {
					this._core.copy(updated, doc);

					this._sportcoachService.update(doc);
				});
		},
		delete: (doc: Sportcoach): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportcoach?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportcoachService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportcoach): void => {
					this._form.modalUnique<Sportcoach>('sportcoach', 'url', doc);
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

	rows: Sportcoach[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportcoachService: SportcoachService,
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
				this._sportcoachService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportcoach>(create ? [] : this.rows)
				.then(async (sportcoachs: Sportcoach[]) => {
					if (create) {
						for (const sportcoach of sportcoachs) {
							this._preCreate(sportcoach);

							await firstValueFrom(
								this._sportcoachService.create(sportcoach)
							);
						}
					} else {
						for (const sportcoach of this.rows) {
							if (
								!sportcoachs.find(
									(localSportcoach) => localSportcoach._id === sportcoach._id
								)
							) {
								await firstValueFrom(
									this._sportcoachService.delete(sportcoach)
								);
							}
						}

						for (const sportcoach of sportcoachs) {
							const localSportcoach = this.rows.find(
								(localSportcoach) => localSportcoach._id === sportcoach._id
							);

							if (localSportcoach) {
								this._core.copy(sportcoach, localSportcoach);

								await firstValueFrom(
									this._sportcoachService.update(localSportcoach)
								);
							} else {
								this._preCreate(sportcoach);

								await firstValueFrom(
									this._sportcoachService.create(sportcoach)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportcoach: Sportcoach): void {
		delete sportcoach.__created;
	}
}
