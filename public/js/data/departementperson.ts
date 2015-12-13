//departementperson.ts
import {IDepartementPerson} from 'infodata';
import {PersonItem} from './personitem';
import {Person} from './person';
//
export class DepartementPerson extends PersonItem implements IDepartementPerson {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public start_key(): string {
        let s1: string = this.store_prefix();
        let s2: string = this.departementid;
        if (s1 == null) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
    public create_id(): string {
        let s1: string = this.start_key();
        let s2: string = this.personid;
        if (s1 == null) {
            s1 = "";
        }
        if (s2 == null) {
            s2 = "";
        }
        return (s1 + s2);
    }
}// class DepartementPerson
//


