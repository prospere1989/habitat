import { userModel } from "./userModel";
import { UserInfosProvider} from '../providers/user-infos/user-infos'
export class messageModel {
    objet: string;
    message: string;
    user: UserInfosProvider;
    date: Date;
    constructor() {
        
    }
    
}