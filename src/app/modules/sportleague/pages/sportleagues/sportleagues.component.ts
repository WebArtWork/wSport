import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportleagueService } from '../../services/sportleague.service';
import { Sportleague } from '../../interfaces/sportleague.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportleagueFormComponents } from '../../formcomponents/sportleague.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportleagues.component.html',
	styleUrls: ['./sportleagues.component.scss'],
	standalone: false,
})
export class SportleaguesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportleague', sportleagueFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportleagueService.setPerPage.bind(this._sportleagueService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportleague>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportleague);

					await firstValueFrom(
						this._sportleagueService.create(created as Sportleague)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportleague): void => {
			this._form
				.modal<Sportleague>(this.form, [], doc)
				.then((updated: Sportleague) => {
					this._core.copy(updated, doc);

					this._sportleagueService.update(doc);
				});
		},
		delete: (doc: Sportleague): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportleague?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportleagueService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportleague): void => {
					this._form.modalUnique<Sportleague>('sportleague', 'url', doc);
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

	rows: Sportleague[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportleagueService: SportleagueService,
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
				this._sportleagueService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportleague>(create ? [] : this.rows)
				.then(async (sportleagues: Sportleague[]) => {
					if (create) {
						for (const sportleague of sportleagues) {
							this._preCreate(sportleague);

							await firstValueFrom(
								this._sportleagueService.create(sportleague)
							);
						}
					} else {
						for (const sportleague of this.rows) {
							if (
								!sportleagues.find(
									(localSportleague) => localSportleague._id === sportleague._id
								)
							) {
								await firstValueFrom(
									this._sportleagueService.delete(sportleague)
								);
							}
						}

						for (const sportleague of sportleagues) {
							const localSportleague = this.rows.find(
								(localSportleague) => localSportleague._id === sportleague._id
							);

							if (localSportleague) {
								this._core.copy(sportleague, localSportleague);

								await firstValueFrom(
									this._sportleagueService.update(localSportleague)
								);
							} else {
								this._preCreate(sportleague);

								await firstValueFrom(
									this._sportleagueService.create(sportleague)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportleague: Sportleague): void {
		delete sportleague.__created;
	}
}
