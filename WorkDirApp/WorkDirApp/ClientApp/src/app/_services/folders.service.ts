import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  path: string = "";

  constructor() { }

  getPath(){
    return this.path;
  }

  setPath(path:string){
    this.path = path;
  }
}
