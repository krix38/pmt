
export class RequirementNode {
  id: number;
  label: string;
  leaf: boolean;
  expanded: boolean;
  children: RequirementNode[];
  type: string;

  constructor(id: number, label: string, expanded: boolean, leaf: boolean, requirementType: string){
    this.id = id;
    this.label = label;
    this.expanded = expanded;
    this.leaf = leaf;
    this.type = requirementType;
    this.children = [];
  }
}
