import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { SportchallengeService } from '../../services/sportchallenge.service';
import { Sportchallenge } from '../../interfaces/sportchallenge.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { sportchallengeFormComponents } from '../../formcomponents/sportchallenge.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './sportchallenges.component.html',
	styleUrls: ['./sportchallenges.component.scss'],
	standalone: false,
})
export class SportchallengesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('sportchallenge', sportchallengeFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._sportchallengeService.setPerPage.bind(this._sportchallengeService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Sportchallenge>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Sportchallenge);

					await firstValueFrom(
						this._sportchallengeService.create(created as Sportchallenge)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Sportchallenge): void => {
			this._form
				.modal<Sportchallenge>(this.form, [], doc)
				.then((updated: Sportchallenge) => {
					this._core.copy(updated, doc);

					this._sportchallengeService.update(doc);
				});
		},
		delete: (doc: Sportchallenge): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this sportchallenge?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._sportchallengeService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Sportchallenge): void => {
					this._form.modalUnique<Sportchallenge>('sportchallenge', 'url', doc);
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

	rows: Sportchallenge[] = [];

	constructor(
		private _translate: TranslateService,
		private _sportchallengeService: SportchallengeService,
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
				this._sportchallengeService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Sportchallenge>(create ? [] : this.rows)
				.then(async (sportchallenges: Sportchallenge[]) => {
					if (create) {
						for (const sportchallenge of sportchallenges) {
							this._preCreate(sportchallenge);

							await firstValueFrom(
								this._sportchallengeService.create(sportchallenge)
							);
						}
					} else {
						for (const sportchallenge of this.rows) {
							if (
								!sportchallenges.find(
									(localSportchallenge) => localSportchallenge._id === sportchallenge._id
								)
							) {
								await firstValueFrom(
									this._sportchallengeService.delete(sportchallenge)
								);
							}
						}

						for (const sportchallenge of sportchallenges) {
							const localSportchallenge = this.rows.find(
								(localSportchallenge) => localSportchallenge._id === sportchallenge._id
							);

							if (localSportchallenge) {
								this._core.copy(sportchallenge, localSportchallenge);

								await firstValueFrom(
									this._sportchallengeService.update(localSportchallenge)
								);
							} else {
								this._preCreate(sportchallenge);

								await firstValueFrom(
									this._sportchallengeService.create(sportchallenge)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(sportchallenge: Sportchallenge): void {
		delete sportchallenge.__created;
	}
}
