import { Injectable } from '@angular/core';
import { SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { Folder } from '../models/folder';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  folder: Folder;    // удалять или сохранять?
  path: string = "";
  isExpanded: boolean;

  constructor() { }

  getIsExpanded(){
    return this.isExpanded;
  }

  setIsExpanded(isExpanded: boolean){
    this.isExpanded = isExpanded;
  }

  getFolder(){
    return this.folder;
  }

  setFolder(folder:Folder){
    this.folder=folder;
  }

  getPath(){
    return this.path;
  }

  setPath(path:string){
    this.path = path;
  }
}
