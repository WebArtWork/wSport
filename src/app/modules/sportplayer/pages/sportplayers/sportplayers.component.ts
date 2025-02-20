import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportplayerService } from '../../services/sportplayer.service';
import { Sportplayer } from '../../interfaces/sportplayer.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportplayerFormComponents } from '../../formcomponents/sportplayer.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportplayers.component.html',
	styleUrls: ['./sportplayers.component.scss'],
	standalone: false,
})
export class SportplayersComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportplayer', sportplayerFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportplayerService.setPerPage.bind(this._sportplayerService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportplayer>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportplayer);

					await firstValueFrom(
						this._sportplayerService.create(created as Sportplayer)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportplayer): void => {
			this._form
				.modal<Sportplayer>(this.form, [], doc)
				.then((updated: Sportplayer) => {
					this._core.copy(updated, doc);

					this._sportplayerService.update(doc);
				});
		},
		delete: (doc: Sportplayer): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportplayer?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportplayerService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportplayer): void => {
					this._form.modalUnique<Sportplayer>('sportplayer', 'url', doc);
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

	rows: Sportplayer[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportplayerService: SportplayerService,
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
				this._sportplayerService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportplayer>(create ? [] : this.rows)
				.then(async (sportplayers: Sportplayer[]) => {
					if (create) {
						for (const sportplayer of sportplayers) {
							this._preCreate(sportplayer);

							await firstValueFrom(
								this._sportplayerService.create(sportplayer)
							);
						}
					} else {
						for (const sportplayer of this.rows) {
							if (
								!sportplayers.find(
									(localSportplayer) => localSportplayer._id === sportplayer._id
								)
							) {
								await firstValueFrom(
									this._sportplayerService.delete(sportplayer)
								);
							}
						}

						for (const sportplayer of sportplayers) {
							const localSportplayer = this.rows.find(
								(localSportplayer) => localSportplayer._id === sportplayer._id
							);

							if (localSportplayer) {
								this._core.copy(sportplayer, localSportplayer);

								await firstValueFrom(
									this._sportplayerService.update(localSportplayer)
								);
							} else {
								this._preCreate(sportplayer);

								await firstValueFrom(
									this._sportplayerService.create(sportplayer)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportplayer: Sportplayer): void {
		delete sportplayer.__created;
	}
}
