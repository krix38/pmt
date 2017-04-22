import { Injectable } from '@angular/core';

import { Regulation } from '../model/regulation';
import { RegulationNode } from '../model/regulationNode';
import { REGULATIONS } from '../model/mock-regulations';

import { TreeNode } from 'primeng/primeng';

//MOCK-SERVICE
//TODO: WIRE THIS SERVICE TO REST API
@Injectable()
export class RegulationService {

  convertRegulationsToLeafs(regulations: Regulation[]): RegulationNode[]{
      var leafs: RegulationNode[] = [];
      regulations.forEach(regulation => {
        let leaf: RegulationNode = new RegulationNode("Regulation: " + regulation.name, null, null, null, false);
        leafs.push(leaf)
      });
      var rootNode = new RegulationNode("Requirements", null, null, null, false);
      rootNode.children = leafs;
      return [ rootNode ];
  }

  getRegulations(): Promise<Regulation[]> {
    return Promise.resolve(REGULATIONS)
    .then(res => <TreeNode[]> this.convertRegulationsToLeafs(res));
  }

  getRegulation(id: number): Promise<Regulation> {
    return this.getRegulations()
               .then(regulations => regulations.find(regulation => regulation.id === id));
  }

  addRegulation(regulation: Regulation) {
    let newIndex = (REGULATIONS.length > 0)
      ? REGULATIONS[REGULATIONS.length-1].id + 1
      : 0;
    regulation.id = newIndex;
    REGULATIONS.push(regulation);
    return newIndex;
  }

}
