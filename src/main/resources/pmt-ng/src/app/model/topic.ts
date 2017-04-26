import { Requirement }  from "./requirement";

export class Topic extends Requirement {
  constructor(id: number, name: string, description: string){
    super(id, name, description);
  }
}
