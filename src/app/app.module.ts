import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'document',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Document'
					}
				},
				loadChildren: () =>
					import('./pages/guest/document/document.module').then(
						(m) => m.DocumentModule
					)
			},
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: 'manage',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			{
				path: 'tactics',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sporttactics'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sporttactic/pages/sporttactics/sporttactics.module'
					).then((m) => m.SporttacticsModule)
			},
			{
				path: 'contracts',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportcontracts'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportcontract/pages/sportcontracts/sportcontracts.module'
					).then((m) => m.SportcontractsModule)
			},
			{
				path: 'gears',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportgears'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportgear/pages/sportgears/sportgears.module'
					).then((m) => m.SportgearsModule)
			},
			{
				path: 'facilities',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportfacilities'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportfacility/pages/sportfacilities/sportfacilities.module'
					).then((m) => m.SportfacilitiesModule)
			},
			{
				path: 'matches',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportmatches'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportmatch/pages/sportmatches/sportmatches.module'
					).then((m) => m.SportmatchesModule)
			},
			{
				path: 'leagues',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportleagues'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportleague/pages/sportleagues/sportleagues.module'
					).then((m) => m.SportleaguesModule)
			},
			{
				path: 'events',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportevents'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportevent/pages/sportevents/sportevents.module'
					).then((m) => m.SporteventsModule)
			},
			{
				path: 'teams',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportteams'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportteam/pages/sportteams/sportteams.module'
					).then((m) => m.SportteamsModule)
			},
			{
				path: 'clubs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportclubs'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportclub/pages/sportclubs/sportclubs.module'
					).then((m) => m.SportclubsModule)
			},
			{
				path: 'referees',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportreferees'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportreferee/pages/sportreferees/sportreferees.module'
					).then((m) => m.SportrefereesModule)
			},
			{
				path: 'coaches',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportcoaches'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportcoach/pages/sportcoaches/sportcoaches.module'
					).then((m) => m.SportcoachesModule)
			},
			{
				path: 'players',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportplayers'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportplayer/pages/sportplayers/sportplayers.module'
					).then((m) => m.SportplayersModule)
			},
			{
				path: 'healths',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sporthealths'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sporthealth/pages/sporthealths/sporthealths.module'
					).then((m) => m.SporthealthsModule)
			},
			{
				path: 'recoveries',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportrecoveries'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportrecovery/pages/sportrecoveries/sportrecoveries.module'
					).then((m) => m.SportrecoveriesModule)
			},
			{
				path: 'nutritions',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportnutritions'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportnutrition/pages/sportnutritions/sportnutritions.module'
					).then((m) => m.SportnutritionsModule)
			},
			{
				path: 'achievements',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportachievements'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportachievement/pages/sportachievements/sportachievements.module'
					).then((m) => m.SportachievementsModule)
			},
			{
				path: 'challenges',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportchallenges'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportchallenge/pages/sportchallenges/sportchallenges.module'
					).then((m) => m.SportchallengesModule)
			},
			{
				path: 'trainings',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sporttrainings'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sporttraining/pages/sporttrainings/sporttrainings.module'
					).then((m) => m.SporttrainingsModule)
			},
			{
				path: 'activities',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sportactivities'
					}
				},
				loadChildren: () =>
					import(
						'./modules/sportactivity/pages/sportactivities/sportactivities.module'
					).then((m) => m.SportactivitiesModule)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'tactic',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tactic'
					}
				},
				loadChildren: () =>
					import('./pages/user/tactic/tactic.module').then(
						(m) => m.TacticModule
					)
			},
			{
				path: 'tactics',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Tactics'
					}
				},
				loadChildren: () =>
					import('./pages/user/tactics/tactics.module').then(
						(m) => m.TacticsModule
					)
			},
			{
				path: 'contract',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Contract'
					}
				},
				loadChildren: () =>
					import('./pages/user/contract/contract.module').then(
						(m) => m.ContractModule
					)
			},
			{
				path: 'contracts',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Contracts'
					}
				},
				loadChildren: () =>
					import('./pages/user/contracts/contracts.module').then(
						(m) => m.ContractsModule
					)
			},
			{
				path: 'gear',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Gear'
					}
				},
				loadChildren: () =>
					import('./pages/user/gear/gear.module').then(
						(m) => m.GearModule
					)
			},
			{
				path: 'facility',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Facility'
					}
				},
				loadChildren: () =>
					import('./pages/user/facility/facility.module').then(
						(m) => m.FacilityModule
					)
			},
			{
				path: 'facilities',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Facilities'
					}
				},
				loadChildren: () =>
					import('./pages/user/facilities/facilities.module').then(
						(m) => m.FacilitiesModule
					)
			},
			{
				path: 'team',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Team'
					}
				},
				loadChildren: () =>
					import('./pages/user/team/team.module').then(
						(m) => m.TeamModule
					)
			},
			{
				path: 'teams',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Teams'
					}
				},
				loadChildren: () =>
					import('./pages/user/teams/teams.module').then(
						(m) => m.TeamsModule
					)
			},
			{
				path: 'club',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Club'
					}
				},
				loadChildren: () =>
					import('./pages/user/club/club.module').then(
						(m) => m.ClubModule
					)
			},
			{
				path: 'clubs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clubs'
					}
				},
				loadChildren: () =>
					import('./pages/user/clubs/clubs.module').then(
						(m) => m.ClubsModule
					)
			},
			{
				path: 'referee',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Referee'
					}
				},
				loadChildren: () =>
					import('./pages/user/referee/referee.module').then(
						(m) => m.RefereeModule
					)
			},
			{
				path: 'referees',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Referees'
					}
				},
				loadChildren: () =>
					import('./pages/user/referees/referees.module').then(
						(m) => m.RefereesModule
					)
			},
			{
				path: 'coach',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Coach'
					}
				},
				loadChildren: () =>
					import('./pages/user/coach/coach.module').then(
						(m) => m.CoachModule
					)
			},
			{
				path: 'coaches',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Coaches'
					}
				},
				loadChildren: () =>
					import('./pages/user/coaches/coaches.module').then(
						(m) => m.CoachesModule
					)
			},
			{
				path: 'player',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Player'
					}
				},
				loadChildren: () =>
					import('./pages/user/player/player.module').then(
						(m) => m.PlayerModule
					)
			},
			{
				path: 'players',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Players'
					}
				},
				loadChildren: () =>
					import('./pages/user/players/players.module').then(
						(m) => m.PlayersModule
					)
			},
			{
				path: 'match',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Match'
					}
				},
				loadChildren: () =>
					import('./pages/user/match/match.module').then(
						(m) => m.MatchModule
					)
			},
			{
				path: 'matches',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Matches'
					}
				},
				loadChildren: () =>
					import('./pages/user/matches/matches.module').then(
						(m) => m.MatchesModule
					)
			},
			{
				path: 'league',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'League'
					}
				},
				loadChildren: () =>
					import('./pages/user/league/league.module').then(
						(m) => m.LeagueModule
					)
			},
			{
				path: 'leagues',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Leagues'
					}
				},
				loadChildren: () =>
					import('./pages/user/leagues/leagues.module').then(
						(m) => m.LeaguesModule
					)
			},
			{
				path: 'event',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Event'
					}
				},
				loadChildren: () =>
					import('./pages/user/event/event.module').then(
						(m) => m.EventModule
					)
			},
			{
				path: 'events',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Events'
					}
				},
				loadChildren: () =>
					import('./pages/user/events/events.module').then(
						(m) => m.EventsModule
					)
			},
			{
				path: 'challenge',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Challenge'
					}
				},
				loadChildren: () =>
					import('./pages/user/challenge/challenge.module').then(
						(m) => m.ChallengeModule
					)
			},
			{
				path: 'challenges',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Challenges'
					}
				},
				loadChildren: () =>
					import('./pages/user/challenges/challenges.module').then(
						(m) => m.ChallengesModule
					)
			},
			{
				path: 'training',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Training'
					}
				},
				loadChildren: () =>
					import('./pages/user/training/training.module').then(
						(m) => m.TrainingModule
					)
			},
			{
				path: 'trainings',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Trainings'
					}
				},
				loadChildren: () =>
					import('./pages/user/trainings/trainings.module').then(
						(m) => m.TrainingsModule
					)
			},
			{
				path: 'dashboard',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Dashboard'
					}
				},
				loadChildren: () =>
					import('./pages/user/dashboard/dashboard.module').then(
						(m) => m.DashboardModule
					)
			},
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: environment.meta.title,
					description: environment.meta.description,
					titleSuffix: ' | ' + environment.meta.title,
					'og:image': environment.meta.icon
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
