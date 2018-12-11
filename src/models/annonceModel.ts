export class AnnonceModel{
    type:string;
    prix:string;
    meuble:string;
    louer:string;
    caution:number;
    moderne:string;
    chambres:number;
    douches:number;
    cuisines:number;
    salons:number;
    niveau :number;
    superficie:number;
    unite:string='m';
    user:string;
    ville : string;
    quartier : string;
    titre:string;
    photo:any[] = new Array();
    key:string;
    avance:number;
    constructor(){
        this.quartier = "";
        this.caution=0;
        this.superficie=0;
    }
}