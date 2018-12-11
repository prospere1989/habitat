import { FormControl } from '@angular/forms';

export class publierValidator {

    static type(f:FormControl){

        if(!f.value){

            return {

                "required":true

            }

        }

    }

    static prix(f: FormControl) {
        if (Number(f.value) < 0 || Number(f.value) == 0) {
            return {
                "negatif": true
            }
        }
        return null;
    }

    static moderne(f: FormControl) {
         if (f.root.value.type == 'Chambres' || f.root.value.type == 'Studios') {
             if (!f.value) {
                 return {
                     "moderne": true
                 }
             }
         }
        return null;
    }
    
    static titre(f:FormControl){
        if(f.root.value.type =='Terrains'){
            if(!f.value){
                return {
                    "required":true
                }
            }
        }
        return null;
    }

    static louer(f: FormControl) {
        console.log(f)
    /* if(!f){
            return null;
        }
       /* if (f.root.value.type == 'Chambres' || f.root.value.type == 'Studios') {
            f.setValue('louer');
        }

        console.log(f.root.value.type)*/
        
        if((f.root.value.type !== 'Chambres') && (f.root.value.type !== 'Studios')){
            if (!f.value) {
                return {
                    "louer": true
                }
            }
        }
        console.log(f.root.value.type)
        
        return null;
        
    }

    static unite(f:FormControl){
        if(f.root.value.type =='Terrains'){
            if(!f.value){
                return {"required":true}
            }
        }
        return null;
    }

    static superficie(f:FormControl){
        if(f.root.value.type =='Terrains'){
            if(!f.value){
                return {"required":true}
            }
        }
        if(f.value){
            if(Number(f.value) < 0 || Number(f.value)==0 ){
                return {
                    "negatif":true
                }
            }
        }
        return null;
    }

    static niveau(f: FormControl) {

        if (f.root.value.type == 'Immeubles') {
            if (Number(f.value) < 0 || Number(f.value) == 0) {
                return {
                    "niveau": true
                }
            }
        }

        if (f.root.value.type == 'Maisons') {
            if (Number(f.value) < 0) {
                return {
                    "niveau": true
                }
            }
        }


        return null;

    }

    static positif(f: FormControl) {
        if (f.root.value.type == 'Maisons' || f.root.value.type == 'Appartements') {
            if (Number(f.value) < 0 || Number(f.value) == 0) {
                return {
                    "negatif": true
                }
            } else if (!f.value) {
                return { "required": true };
            }
        }
        return null;
    }

    static caution_avance(f: FormControl) {
        if (f.root.value.louer) {
            if (f.root.value.louer == 'louer') {
                if (!f.value) {
                    return {
                        "required": true
                    }
                } else if (Number(f.value) < 0 || Number(f.value) == 0) {
                    return {
                        "invalid": true
                    }
                }
            }
        }
        else if (f.root.value.type == 'Chambres' || f.root.value.type == 'Studios') {
            if (!f.value) {
                return {
                    "required": true
                }
            } else if (Number(f.value) < 0 || Number(f.value) == 0) {
                return {
                    "invalid": true
                }
            }
        }

        return null;
    }

    static quartier(f: FormControl) {
        if (f.value) {
            if (f.value.trim().length == 0) {
                return null;
            }
            else {
                if (f.value.trim().length < 3) {
                    return {
                        "invalid": true
                    }
                }
            }
        }

        return null;
    }


}