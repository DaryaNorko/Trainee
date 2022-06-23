import { Injectable } from '@angular/core';
import { SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { Folder } from '../models/folder';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  path: string = "";
  isExpanded: boolean;

  constructor() { }

  getIsExpanded(){
    return this.isExpanded;
  }

  setIsExpanded(isExpanded: boolean){
    this.isExpanded = isExpanded;
  }

  getPath(){
    return this.path;
  }

  setPath(path:string){
    this.path = path;
  }
}
