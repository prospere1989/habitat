import {FormControl} from '@angular/forms'
import * as firebase from 'firebase'
export class messageValidator{
    static numero(f:FormControl){
       if(isNaN(f.value)) {
            return {
                "incorrect":true
            }
        }
        if(Number(f.value) < 0){
            return {
                "negatif":true
            }
        }
        
        return null;
    }
}