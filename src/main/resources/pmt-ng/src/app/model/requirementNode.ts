export class RequirementNode {
  id: number;
  label: string;
  leaf: boolean;
  expanded: boolean;
  children: RequirementNode[];

  constructor(id: number, label: string, expanded: boolean, leaf: boolean){
    this.id = id;
    this.label = label;
    this.expanded = expanded;
    this.leaf = leaf;
    this.children = [];
  }
}
