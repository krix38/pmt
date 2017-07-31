import { Requirement }  from "./requirement";
import { Regulation } from "./regulation";

export class Topic extends Requirement {

  regulationId: number;

  constructor(id: number, name: string, description: string, regulationId: number){
    super(id, name, description);
    this.regulationId = regulationId;
  }
}
