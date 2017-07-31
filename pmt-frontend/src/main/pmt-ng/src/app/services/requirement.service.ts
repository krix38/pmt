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
        this.updateRegulation(<Regulation>requirement);
        break;
      case Topic:
        this.updateTopic(<Topic>requirement);
        break;
    }
  }

  deleteRequirement(requirement: Requirement){
    switch(requirement.constructor){
      case Regulation:
        this.deleteRegulation(<Regulation>requirement);
        break;
      case Topic:
        this.deleteTopic(<Topic>requirement);
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
      updatedTopic => {
        this.updateTopicInRequirementTree(topic);
        this.updateRequirementsObservable();
      }
    )
  }

  updateRegulation(regulation: Regulation){
    let ready = this.updateRegulationMock(regulation);
    ready.subscribe(
      updatedRegulation => {
        this.updateRegulationInRequirementTree(regulation);
        this.updateRequirementsObservable();
      }
    )
  }

  deleteTopic(topic: Topic){
    let ready = this.removeTopicMock(topic);
    ready.subscribe(
      deletedTopic => {
        this.deleteTopicFromRequirementTree(topic);
        this.updateRequirementsObservable();
      }
    )
  }

  deleteRegulation(regulation: Regulation){
    let ready = this.removeRegulationMock(regulation);
    ready.subscribe(
      deletedRegulation => {
        this.deleteRegulationFromRequirementTree(regulation);
        this.updateRequirementsObservable();
      }
    )
  }

  updateRequirementsObservable(){
    this._requirementTree.next(this._requirementTree.getValue());
  }

  updateTopicInRequirementTree(topic: Topic){
    if(this.getRegulationNodeByTopicId(topic.id).id == topic.regulationId){
      this.editTopicInRequirementTree(topic);
    }else{
      this.deleteTopicFromRequirementTree(topic);
      this.addTopicToRequirementTree(topic);
    }
  }

  updateRegulationInRequirementTree(regulation: Regulation){
    let regulations: RequirementNode[] = this.getRegulationNodes();
    regulations.forEach((regulationNode, selectedIndex, regulations) => {
      if(regulationNode.id == regulation.id){
        regulationNode.label = "Regulation: " + regulation.name;
      }
    });
  }

  editTopicInRequirementTree(topic: Topic){
    let regulation: RequirementNode = this.getRegulationNodeByTopicId(topic.id);
    regulation.children.forEach((topicNode, selectedIndex, topics) => {
      if(topicNode.id == topic.id){
        topicNode.label = "Topic: " + topic.name;
      }
    });
  }

  deleteTopicFromRequirementTree(topic: Topic){
    let regulation: RequirementNode = this.getRegulationNodeByTopicId(topic.id);
    regulation.children.forEach((topicNode, selectedIndex, topics) => {
      if(topicNode.id == topic.id){
        topics.splice(selectedIndex, 1);
        if(regulation.children.length == 0){
          regulation.leaf = true;
          regulation.expanded = false;
        }
      }
    });
  }

  deleteRegulationFromRequirementTree(regulation: Regulation){
    let regulations: RequirementNode[] = this.getRegulationNodes();
    regulations.forEach((regulationNode, selectedIndex, regulations) => {
      if(regulationNode.id == regulation.id){
        regulations.splice(selectedIndex, 1);
        if(regulations.length == 0){
          this.getRootNode().leaf = true;
          this.getRootNode().expanded = false;
        }
      }
    });
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

  getRegulationNodeByTopicId(id: number): RequirementNode{
    let retval: RequirementNode = null;
    this.getRegulationNodes().forEach(
      regulation => {
        regulation.children.forEach(
          topic => {
            if(topic.id == id){
              retval = regulation;
            }
          }
        )
      }
    );
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

  getRegulation(id: number, processRegulation: Function){
    let ready: Observable<Regulation> = this.getRegulationRemoteMock(id);
    ready.subscribe(regulation => processRegulation(regulation));
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

  getRegulationRemoteMock(id: number): Observable<Regulation> {
    let returnRegulation: Observable<Regulation>;
    REGULATIONS.forEach(regulation => {
      if(regulation.id == id){
        returnRegulation = new Observable(observer => observer.next(regulation))
      }
    });
    return returnRegulation;
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

  updateRegulationMock(regulationToUpdate: Regulation): Observable<Regulation> {
    REGULATIONS.forEach((regulation, selectedIndex, regulationArray) => {
      if(regulation.id == regulationToUpdate.id){
        regulationArray[selectedIndex] = regulationToUpdate;
      }
    });
    return new Observable(observer => observer.next(regulationToUpdate));
  }

  removeTopicMock(topicToRemove: Topic): Observable<Topic> {
    TOPICS.forEach((topic, selectedIndex, topicArray) => {
      if(topic.id == topicToRemove.id){
        topicArray.splice(selectedIndex, 1);
      }
    });
    return new Observable(observer => observer.next(null));
  }

  removeRegulationMock(regulationToRemove: Regulation): Observable<Regulation> {
    REGULATIONS.forEach((regulation, selectedIndex, regulationArray) => {
      if(regulation.id == regulationToRemove.id){
        regulationArray.splice(selectedIndex, 1);
      }
    });
    TOPICS.forEach((topic, selectedIndex, topicArray) => {
      if(topic.regulationId == regulationToRemove.id){
        topicArray.splice(selectedIndex, 1);
      }
    });
    return new Observable(observer => observer.next(null));
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
