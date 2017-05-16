import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs/Rx";

import { Regulation } from '../model/regulation';
import { Topic } from '../model/topic'
import { Requirement } from '../model/requirement';
import { RequirementNode } from '../model/requirement-node';
import { REGULATIONS } from '../model/mock-regulations';
import { TOPICS } from '../model/mock-topics'

import { TreeNode } from 'primeng/primeng';

//MOCK-SERVICE
//TODO: WIRE THIS SERVICE TO REST API
@Injectable()
export class RequirementService {

  private _requirementTree: BehaviorSubject<RequirementNode[]> = new BehaviorSubject([]);
  public readonly requirementTree: Observable<RequirementNode[]> = this._requirementTree.asObservable();

  constructor(){
    this.addRootNode();
  }

  addRootNode(){
    this
      ._requirementTree
      .getValue()
      .push(new RequirementNode(0, "Requirements", false, true, "rootnode"));
  }

  getAllRegulations(processRegulations: Function) {
    let ready = this.getAllRegulationsRemoteMock();
    ready.subscribe(
      fetchedRegulations => processRegulations(fetchedRegulations)
    );
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

  updateRequirement(requirement: Requirement){
    switch(requirement.constructor){
      case Regulation:
        //TODO: updateRegulation
        this.addRegulation(<Regulation>requirement);
        break;
      case Topic:
        this.updateTopic(<Topic>requirement);
        break;
    }
  }

  addRegulation(regulation: Regulation){
      let ready = this.saveRegulationMock(regulation);
      ready.subscribe(
        persistedRegulation => {
          this.addRegulationToRequirementTree(persistedRegulation);
          this.updateRequirementsObservable();
        }
      )
  }

  addTopic(topic: Topic){
    let ready = this.saveTopicMock(topic);
    ready.subscribe(
      persistedRegulation => {
        this.addTopicToRequirementTree(persistedRegulation);
        this.updateRequirementsObservable();
      }
    )
  }

  updateTopic(topic: Topic){
    let ready = this.updateTopicMock(topic);
    ready.subscribe(
      persistedTopic => {
        this.updateTopicInRequirementTree(persistedTopic);
        this.updateRequirementsObservable();
      }
    )
  }



  updateRequirementsObservable(){
    this._requirementTree.next(this._requirementTree.getValue());
  }

  updateTopicInRequirementTree(topic: Topic){
    let regulation: RequirementNode = this.getRegulationNodeById(topic.regulationId);
    regulation.leaf = false;
    regulation.expanded = true;
    regulation.children.forEach((topicNode, selectedIndex, topics) => {
      if(topicNode.id == topic.id){
        topics[selectedIndex] = this.convertTopicToRequirementNode(topic);
      }
    })
  }

  addRegulationToRequirementTree(regulation: Regulation){
    let rootNode: RequirementNode = this.getRootNode();
    if(rootNode.children.length == 0){
      rootNode.expanded = true;
      rootNode.leaf = false;
    }
    this.getRegulationNodes().push(this.convertRegulationToRequirementNode(regulation));
  }

  addTopicToRequirementTree(topic: Topic){
    let regulation: RequirementNode = this.getRegulationNodeById(topic.regulationId);
    regulation.leaf = false;
    regulation.expanded = true;
    regulation.children.push(this.convertTopicToRequirementNode(topic));
  }

  getRegulationNodeById(id: number): RequirementNode{
    let retval: RequirementNode = null;
    this
      .getRegulationNodes().forEach(
        node => {
          if(node.id == id){
            retval = node;
          }
      });
      return retval;
  }

  getRegulationNodes(): RequirementNode[]{
    return this._requirementTree.getValue()[0].children;
  }

  getRootNode(): RequirementNode{
    return this._requirementTree.getValue()[0];
  }

  getTopic(id: number, processTopic: Function){
    let ready: Observable<Topic> = this.getTopicRemoteMock(id);
    ready.subscribe(topic => processTopic(topic));
  }

  getTopicRemoteMock(id: number): Observable<Topic> {
    let returnTopic: Observable<Topic>;
    TOPICS.forEach(topic => {
      if(topic.id == id){
        returnTopic = new Observable(observer => observer.next(topic))
      }
    });
    return returnTopic;
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

  updateTopicMock(topicToUpdate: Topic): Observable<Topic> {
    TOPICS.forEach((topic, selectedIndex, topicArray) => {
      if(topic.id == topicToUpdate.id){
        topicArray[selectedIndex] = topicToUpdate;
      }
    });
    return new Observable(observer => observer.next(topicToUpdate));
  }

  getAllRegulationsRemoteMock(): Observable<Regulation[]> {
    return new Observable(observer => observer.next(REGULATIONS));
  }

  convertRegulationToRequirementNode(regulation: Regulation): RequirementNode{
    return new RequirementNode(regulation.id, "Regulation: " + regulation.name, false, true, "regulation");
  }

  convertTopicToRequirementNode(topic: Topic): RequirementNode{
    return new RequirementNode(topic.id, "Topic: " + topic.name, false, true, "topic");
  }
}
