import { userModel } from "./userModel";
export class visiteModel{
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    date: string;
    uid: string;
    user: userModel;

    constructor() {
        this.user = new userModel();
    }
}