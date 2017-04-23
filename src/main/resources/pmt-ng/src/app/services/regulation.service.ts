import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/Rx";

import { Regulation } from '../model/regulation';
import { RegulationNode } from '../model/regulationNode';
import { REGULATIONS } from '../model/mock-regulations';

import { TreeNode } from 'primeng/primeng';

//MOCK-SERVICE
//TODO: WIRE THIS SERVICE TO REST API
@Injectable()
export class RegulationService {

  private _requirements: BehaviorSubject<RegulationNode[]> = new BehaviorSubject([]);
  public readonly requirements: Observable<RegulationNode[]> = this._requirements.asObservable();

  constructor(){
    var rootNode = new RegulationNode("Requirements", null, null, null, false);

    this
    ._requirements
    .getValue()
    .push(rootNode);
  }

  addRegulation(regulation: Regulation){
      let obs = this.saveRegulationMock(regulation);

      obs.subscribe(
        res => {
          this
          ._requirements
          .getValue()[0]
          .children
          .push(this.convertRegulationToRequirementNode(regulation));
          this._requirements.next(this._requirements.getValue());
        }
      )
  }


  saveRegulationMock(regulation: Regulation): Observable<Regulation> {
    let newIndex = (REGULATIONS.length > 0)
      ? REGULATIONS[REGULATIONS.length-1].id + 1
      : 0;
    regulation.id = newIndex;
    REGULATIONS.push(regulation);
    return new Observable(observer => observer.next(regulation));
  }

  convertRegulationToRequirementNode(regulation: Regulation): RegulationNode{
    return new RegulationNode("Regulation: " + regulation.name, null, null, null, false);
  }

  // convertRegulationsToLeafs(regulations: Regulation[]): RegulationNode[]{
  //     var nodes: RegulationNode[] = [];
  //     regulations.forEach(regulation => {
  //       let node: RegulationNode = new RegulationNode("Regulation: " + regulation.name, null, null, null, false);
  //       nodes.push(node)
  //     });
  //     var rootNode = new RegulationNode("Requirements", null, null, null, false);
  //     rootNode.children = nodes;
  //     return [ rootNode ];
  // }
  //
  // getRegulations(): Promise<Regulation[]> {
  //   return Promise.resolve(REGULATIONS)
  //   .then(res => <TreeNode[]> this.convertRegulationsToLeafs(res));
  // }
  //
  // getRegulation(id: number): Promise<Regulation> {
  //   return this.getRegulations()
  //              .then(regulations => regulations.find(regulation => regulation.id === id));
  // }

}
