import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/Rx";

import { Regulation } from '../model/regulation';
import { Requirement } from '../model/requirement';

import { RequirementNode } from '../model/requirementNode';
import { REGULATIONS } from '../model/mock-regulations';

import { TreeNode } from 'primeng/primeng';

//MOCK-SERVICE
//TODO: WIRE THIS SERVICE TO REST API
@Injectable()
export class RequirementService {

  private _requirements: BehaviorSubject<RequirementNode[]> = new BehaviorSubject([]);
  public readonly requirements: Observable<RequirementNode[]> = this._requirements.asObservable();

  constructor(){
    this.addRootNode();
  }

  addRootNode(){
    this
      ._requirements
      .getValue()
      .push(new RequirementNode("Requirements", null, null, null, false));
  }

  getRequirementsNodes(): RequirementNode[]{
    return this._requirements.getValue()[0].children
  }

  addRequirementToRequirementTree(requirement: Requirement){
    this
      .getRequirementsNodes()
      .push(this.convertRegulationToRequirementNode(<Regulation>requirement));
  }

  updateRequirementsObservable(){
    this._requirements.next(this._requirements.getValue());
  }

  addRequirement(requirement: Requirement){
      let ready = this.saveRegulationMock(<Regulation>requirement);
      ready.subscribe(
        res => {
          this.addRequirementToRequirementTree(requirement);
          this.updateRequirementsObservable();
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

  convertRegulationToRequirementNode(regulation: Regulation): RequirementNode{
    return new RequirementNode("Regulation: " + regulation.name, null, null, null, false);
  }
}
