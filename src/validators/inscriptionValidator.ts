import {FormControl, FormGroup} from '@angular/forms';

export class inscriptionValidator {

    static motdepasse2(f:FormControl){

     let passe=  f.root.value.motdepasse

     if(passe !== f.value){

         return {

             "differents":true

         }

     }
     
     return null;

    }

}