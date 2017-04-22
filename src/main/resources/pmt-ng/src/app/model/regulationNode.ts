export class RegulationNode {
  label: string;
  data: string;
  expandedIcon: string;
  collapsedIcon: string;
  leaf: boolean;
  children: RegulationNode[];

  constructor(label: string, data: string, expandedIcon: string, collapsedIcon: string, leaf: boolean){
    this.label = label;
    this.data = data;
    this.expandedIcon = expandedIcon;
    this.collapsedIcon = collapsedIcon;
    this.leaf = leaf;
  }
}
