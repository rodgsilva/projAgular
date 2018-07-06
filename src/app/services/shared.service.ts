import { Injectable,EventEmitter } from '@angular/core';

import { LocalUser } from '../model/local_user';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Cart } from '../model/cart';

@Injectable()
export class SharedService {
public static instance : SharedService = null;
user:LocalUser;
token:string;
showTemplate = new EventEmitter

getLocalUser() : LocalUser {
  let usr = localStorage.getItem(STORAGE_KEYS.localUser);
  if(usr == null){
    return null;
  }
  else{
    return JSON.parse(usr);
  }

}
setLocalUser(obj:LocalUser) {
if(obj==null){
  localStorage.removeItem(STORAGE_KEYS.localUser);

}else{
  localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(obj));
}

}

// authet
  constructor() { 
    return SharedService.instance = SharedService.instance || this;
  }
 public static getInstace(){
   if(this.instance == null){
     this.instance = new  SharedService();
   }
   return this.instance;
 }
 isLoggerdIn():boolean {
  let localUser= this.getLocalUser();
  if(localUser ==null){
     return false;
  }
  return localUser.email!='';
 
 }

 getCart() : Cart {
  let str = localStorage.getItem(STORAGE_KEYS.cart);
  if (str != null) {
      return JSON.parse(str);
  }
  else {
      return null;
  }
}

setCart(obj : Cart) {
  if (obj != null) {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
  } 
  else {
      localStorage.removeItem(STORAGE_KEYS.cart);
  }
}
}
