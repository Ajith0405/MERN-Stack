import { getUserData, removeUserData } from './Storage'


export const isAunthenticate = ()=>{
        return getUserData() != null? true : false;
}

export const logout=()=>{
        removeUserData();
}