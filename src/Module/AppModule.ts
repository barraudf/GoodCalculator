import {ILocationProvider, IModule, ISCEProvider} from 'angular';
import {StateProvider, UrlRouterProvider} from 'angular-ui-router';
import {HomeController} from '@src/Module/Controllers/HomeController';
import {AppDirective} from '@src/Module/Directives/AppDirective';
import {MaterialController} from '@src/Module/Controllers/MaterialController';
import {CrafterController} from '@src/Module/Controllers/CrafterController';
import {CraftersController} from '@src/Module/Controllers/CraftersController';
import {MaterialIconDirective} from '@src/Module/Directives/MaterialIconDirective';
import {RecentlyVisitedMaterialsService} from '@src/Module/Services/RecentlyVisitedItemsService';
import {ProductionController} from '@src/Module/Controllers/ProductionController';
import { SettingsController } from './Controllers/SettingsController';

export class AppModule
{


	public constructor(private readonly app: IModule)
	{
	}

	public register(): void
	{
		this.app.config([
			'$locationProvider', '$stateProvider', '$urlRouterProvider', '$sceProvider',
			($locationProvider: ILocationProvider, $stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider, $sceProvider: ISCEProvider) => {
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false,
			}).hashPrefix('!');

			$sceProvider.enabled(false);

			$urlRouterProvider.when('', '/');

			$stateProvider.state('home', {
				controller: 'HomeController',
				controllerAs: 'scope',
				url: '/',
				template: require('@templates/Controllers/home.html'),
			});

			$stateProvider.state('material', {
				controller: 'MaterialController',
				controllerAs: 'scope',
				url: '/materials/{material}',
				template: require('@templates/Controllers/material.html'),
			});

			$stateProvider.state('production', {
				controller: 'ProductionController',
				controllerAs: 'scope',
				url: '/production',
				template: require('@templates/Controllers/production.html'),
			});

			$stateProvider.state('crafter', {
				controller: 'CrafterController',
				controllerAs: 'scope',
				url: '/crafters/{crafter}',
				template: require('@templates/Controllers/crafter.html'),
			});

			$stateProvider.state('crafters', {
				controller: 'CraftersController',
				controllerAs: 'scope',
				url: '/crafters',
				template: require('@templates/Controllers/crafters.html'),
			});

			$stateProvider.state('settings', {
				controller: 'SettingsController',
				controllerAs: 'scope',
				url: '/settings',
				template: require('@templates/Controllers/settings.html'),
			});
		}]);

		this.app.run(['$transitions', '$rootScope', ($transitions: any, $rootScope: any) => {

			$transitions.onFinish({}, () => {
				const elements = document.getElementsByClassName('tooltip'); // TODO fix jQLite and replace with angular.element
				for (const index in elements) {
					if (elements.hasOwnProperty(index)) {
						elements[index].remove();
					}
				}
				document.documentElement.scrollTop = 0;
			});
		}]);

		this.app.filter('number', () => {
			return AppModule.generateNumberFormattingFunction();
		});

		this.app.directive('app', () => {
			return new AppDirective;
		});

		this.app.directive('material-icon', () => {
			return new MaterialIconDirective;
		});

		this.app.directive('tooltip', () => {
			return {
				restrict: 'A',
				link: (scope: any, element: any, attrs: any) => {
					element = $(element);
					element.data('boundary', 'window');
					element.on('mouseenter', () => {
						element.tooltip('_fixTitle')
							.tooltip('show');
					}).on('mouseleave', () => {
						element.tooltip('hide');
					});
				},
			};
		});

		this.app.service('RecentlyVisitedMaterialsService', RecentlyVisitedMaterialsService);

		this.app.controller('HomeController', HomeController);
		this.app.controller('MaterialController', MaterialController);
		this.app.controller('ProductionController', ProductionController);
		this.app.controller('CrafterController', CrafterController);
		this.app.controller('CraftersController', CraftersController);
		this.app.controller('SettingsController', SettingsController);
	}

	private static generateNumberFormattingFunction()
	{
		return (value: number) => {
			if (value === ~~value) {
				return value;
			} else {
				return value.toFixed(5).replace(/\.?0+$/, '');
			}
		};
	}

}
