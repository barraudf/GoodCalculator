export class RecentlyVisitedMaterialsService
{

	public recent: number[] = [];

	public constructor()
	{
		this.recent = [];
	}

	public addVisited(materialId: number): void
	{
		const index = this.recent.indexOf(materialId);
		if (index !== -1) {
			this.recent.splice(index, 1);
		}

		this.recent.unshift(materialId);
		while (this.recent.length > 8) {
			this.recent.pop();
		}
	}

	public getRecent(): number[]
	{
		return this.recent;
	}

}
