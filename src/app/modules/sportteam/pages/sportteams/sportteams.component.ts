import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportteamService } from '../../services/sportteam.service';
import { Sportteam } from '../../interfaces/sportteam.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportteamFormComponents } from '../../formcomponents/sportteam.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportteams.component.html',
	styleUrls: ['./sportteams.component.scss'],
	standalone: false,
})
export class SportteamsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportteam', sportteamFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportteamService.setPerPage.bind(this._sportteamService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportteam>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportteam);

					await firstValueFrom(
						this._sportteamService.create(created as Sportteam)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportteam): void => {
			this._form
				.modal<Sportteam>(this.form, [], doc)
				.then((updated: Sportteam) => {
					this._core.copy(updated, doc);

					this._sportteamService.update(doc);
				});
		},
		delete: (doc: Sportteam): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportteam?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportteamService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportteam): void => {
					this._form.modalUnique<Sportteam>('sportteam', 'url', doc);
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

	rows: Sportteam[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportteamService: SportteamService,
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
				this._sportteamService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportteam>(create ? [] : this.rows)
				.then(async (sportteams: Sportteam[]) => {
					if (create) {
						for (const sportteam of sportteams) {
							this._preCreate(sportteam);

							await firstValueFrom(
								this._sportteamService.create(sportteam)
							);
						}
					} else {
						for (const sportteam of this.rows) {
							if (
								!sportteams.find(
									(localSportteam) => localSportteam._id === sportteam._id
								)
							) {
								await firstValueFrom(
									this._sportteamService.delete(sportteam)
								);
							}
						}

						for (const sportteam of sportteams) {
							const localSportteam = this.rows.find(
								(localSportteam) => localSportteam._id === sportteam._id
							);

							if (localSportteam) {
								this._core.copy(sportteam, localSportteam);

								await firstValueFrom(
									this._sportteamService.update(localSportteam)
								);
							} else {
								this._preCreate(sportteam);

								await firstValueFrom(
									this._sportteamService.create(sportteam)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportteam: Sportteam): void {
		delete sportteam.__created;
	}
}
