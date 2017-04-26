import { Requirement }  from "./requirement";
import { Topic }  from "./topic";


export class Regulation extends Requirement {
    constructor(id: number, name: string, description: string, topics: Topic[]){
      super(id, name, description);
      this.topics = topics;
    }
    topics: Topic[];
}
