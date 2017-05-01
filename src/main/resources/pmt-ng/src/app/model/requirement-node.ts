import { RequirementNodeType } from "./requirement-node-type"


export class RequirementNode {
  id: number;
  label: string;
  leaf: boolean;
  expanded: boolean;
  children: RequirementNode[];
  requirementType: RequirementNodeType;

  constructor(id: number, label: string, expanded: boolean, leaf: boolean, requirementType: RequirementNodeType){
    this.id = id;
    this.label = label;
    this.expanded = expanded;
    this.leaf = leaf;
    this.requirementType = requirementType;
    this.children = [];
  }
}
