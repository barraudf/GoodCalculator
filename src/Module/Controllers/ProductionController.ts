import {ProductionTool} from '@src/Tools/Production/ProductionTool';
import model, { Model } from '@src/Data/Model';
import {Material} from '@src/Data/Material';
import {MaterialAmount} from '@src/Data/MaterialAmount';
import vis from 'vis-network';
import {IRootScopeService} from 'angular';
import { IMaterialAmountSchema } from '@src/Schema/IMaterialAmountSchema';

export class ProductionController
{

	public readonly model: Model = model;
	public readonly tool: ProductionTool;
	public readonly craftableMaterials: Material[] = model.getCraftableMaterials();
	public result: string;

	public static $inject = ['$rootScope', '$cookies'];

	public constructor(rootScope: IRootScopeService, private $cookies: any)
	{
		this.tool = new ProductionTool;
		this.LoadProduction();
		this.recalculate();
		rootScope.$watch(() => {
			return this.tool.production.map((materialAmount: MaterialAmount) => {
				return [materialAmount.material.prototype.materialId, materialAmount.prototype.amount];
			});
		}, () => {
			this.recalculate();
		}, true);
	}

	public addEmptyProduct(): void
	{
		this.tool.production.push(new MaterialAmount(this.craftableMaterials[0], { materialId: this.craftableMaterials[0].prototype.materialId, amount: 1 }));
		this.recalculate();
	}

	public removeProduct(product: MaterialAmount): void
	{
		const index = this.tool.production.indexOf(product);
		if (index in this.tool.production) {
			this.tool.production.splice(index, 1);
		}
		this.recalculate();
	}

	public recalculate(): void
	{
		this.tool.calculate();
		if (!this.tool.result) {
			if (this.tool.production.length > 0) {
				alert('Error : unable to solve this production. Some required crafters are not unlocked.');
			}
			return;
		}

		const element = document.getElementById('visualization');
		if (!element) {
			return;
		}

		const network = new vis.Network(element, {
			nodes: this.tool.result.nodes,
			edges: this.tool.result.edges,
		}, {
			edges: {
				labelHighlightBold: false,
				color: '#697d91',
				font: {
					size: 14,
					multi: 'html',
					color: '#eeeeee',
					strokeColor: 'rgba(0, 0, 0, 0.2)',
				},
				arrows: 'to',
				smooth: true,
			},
			nodes: {
				labelHighlightBold: false,
				font: {
					size: 14,
					multi: 'html',
					color: '#eeeeee',
				},
				color: {
					background: '#df691a',
					border: 'rgba(0,0,0,0)',
					highlight: {
						background: '#e77a31',
						border: '#eeeeee',
					},
				},
				margin: {
					top: 10,
					left: 10,
					right: 10,
					bottom: 10,
				},
				shape: 'box',
			},
			physics: {
				enabled: false,
			},
			layout: {
				hierarchical: {
					direction: 'UD',
					blockShifting: true,
					edgeMinimization: true,
					parentCentralization: true,
					sortMethod: 'directed',
					nodeSpacing: 300,
					treeSpacing: 300,
					levelSeparation: 200,
				},
			},
		});
		network.setOptions({
			layout: {
				hierarchical: false,
			},
		});

		this.SaveProduction();
	}

	private SaveProduction(): void
	{
		const prod: IMaterialAmountSchema[] = [];

		for (const material of this.tool.production)
		{
			material.prototype.materialId = material.material.prototype.materialId; // TODO : changing MaterialAmount.material doesn't change MaterialAmount.prototype.materialId
			prod.push(material.prototype);
		}

		this.$cookies.putObject('production', prod);
	}

	private LoadProduction(): void
	{
		this.tool.production = [];
		const prods: IMaterialAmountSchema[] = this.$cookies.getObject('production');
		if (prods) {
			for (const prod of prods) {
				this.tool.production.push(new MaterialAmount(model.getMaterial(prod.materialId), { materialId: prod.materialId, amount: prod.amount }));
			}

			this.recalculate();
		}
	}

}
