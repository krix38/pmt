import { Injectable } from '@angular/core';

import { Regulation } from '../model/regulation';
import { REGULATIONS } from '../model/mock-regulations';

//MOCK-SERVICE
//TODO: WIRE THIS SERVICE TO REST API
@Injectable()
export class RegulationService {

  getRegulations(): Promise<Regulation[]> {
    return Promise.resolve(REGULATIONS);
  }

  getRegulation(id: number): Promise<Regulation> {
    return this.getRegulations()
               .then(regulations => regulations.find(regulation => regulation.id === id));
  }

  addRegulation(regulation: Regulation) {
    let newIndex = (REGULATIONS.length > 0)
      ? REGULATIONS[REGULATIONS.length-1].id + 1
      : 0;
    regulation.id = newIndex
    REGULATIONS.push(regulation);
    return newIndex;
  }

}
