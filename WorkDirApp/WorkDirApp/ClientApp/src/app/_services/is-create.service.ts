import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsCreateService {
  isCreate: boolean;

  constructor() { }

  getIsCreate(){
    return this.isCreate;
  }

  setIsCreate(status: boolean){
    this.isCreate = status;
  }
}
