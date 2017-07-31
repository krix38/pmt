import { Requirement }  from "./requirement";

export class Regulation extends Requirement {
    constructor(id: number, name: string, description: string){
      super(id, name, description);
    }
}
