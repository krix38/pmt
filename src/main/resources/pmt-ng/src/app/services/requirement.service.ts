import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/Rx";

import { Regulation } from '../model/regulation';
import { Topic } from '../model/topic'
import { Requirement } from '../model/requirement';

import { RequirementNode } from '../model/requirementNode';
import { REGULATIONS } from '../model/mock-regulations';
import { TOPICS } from '../model/mock-topics'

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

  addRequirement(requirement: Requirement){
    switch(requirement.constructor){
      case Regulation:
        this.addRegulation(<Regulation>requirement);
        break;
      case Topic:
        this.addTopic(<Topic>requirement);
        break;
    }
  }

  addRegulation(regulation: Regulation){
      let ready = this.saveRegulationMock(regulation);
      ready.subscribe(
        res => {
          this.addRegulationToRequirementTree(regulation);
          this.updateRequirementsObservable();
        }
      )
  }

  addTopic(topic: Topic){
    let ready = this.saveTopicMock(topic);
    ready.subscribe(
      res => {
        this.addTopicToRequirementTree(topic);
        this.updateRequirementsObservable();
      }
    )
  }

  updateRequirementsObservable(){
    this._requirements.next(this._requirements.getValue());
  }

  addRegulationToRequirementTree(regulation: Regulation){
    this
      .getRequirementsNodes()
      .push(this.convertRegulationToRequirementNode(regulation));
  }

  addTopicToRequirementTree(topic: Topic){
    this
      .getRequirementsNodes() [topic.regulationId]
      .children
      .push(this.convertTopicToRequirementNode(topic));
  }

  getRequirementsNodes(): RequirementNode[]{
    return this._requirements.getValue()[0].children
  }


  saveRegulationMock(regulation: Regulation): Observable<Regulation> {
    let newIndex = (REGULATIONS.length > 0)
      ? REGULATIONS[REGULATIONS.length-1].id + 1
      : 0;
    regulation.id = newIndex;
    REGULATIONS.push(regulation);
    return new Observable(observer => observer.next(regulation));
  }

  saveTopicMock(topic: Topic): Observable<Topic> {
    let newIndex = (TOPICS.length > 0)
      ? TOPICS[TOPICS.length-1].id + 1
      : 0;
    topic.id = newIndex;
    TOPICS.push(topic);
    return new Observable(observer => observer.next(topic));
  }

  convertRegulationToRequirementNode(regulation: Regulation): RequirementNode{
    return new RequirementNode("Regulation: " + regulation.name, null, null, null, false);
  }

  convertTopicToRequirementNode(topic: Topic): RequirementNode{
    return new RequirementNode("Topic: " + topic.name, null, null, null, false);
  }
}
