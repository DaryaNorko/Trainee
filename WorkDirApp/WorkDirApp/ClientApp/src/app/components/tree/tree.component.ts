import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Output } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Folder } from 'src/app/models/folder';
import { NextPath } from 'src/app/models/nextPath';
import { FoldersService } from 'src/app/_services/folders.service';


@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  dto: NextPath = { path: "" };
  path = "https://localhost:5001";
  array: Folder[] = []

  constructor(public http: HttpClient) { }

  getData() {
    return this.http.get<Folder[]>(this.path + "/Folder");
  }

  getChildren(node: Folder) {
    this.dto.path = node.path;
    return this.http.post<Folder[]>(this.path + "/Folder/choseFolder", this.dto);
    
  }

  isExpandable(node: Folder): boolean {
    return node.expandable; // проверить isHasChildren
  }
}

export class DynamicDataSource implements DataSource<Folder> {
  dataChange = new BehaviorSubject<Folder[]>([]);

  get data(): Folder[] {
    return this.dataChange.value; // хочу узнать последнее значение
  }
  set data(value: Folder[]) {
    this._treeControl.dataNodes = value; // поставили в дерево
    this.dataChange.next(value); // всем разослали?
  }

  constructor(
    private _treeControl: FlatTreeControl<Folder>,
    private _database: DynamicDatabase
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<Folder[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<Folder>).added ||
        (change as SelectionChange<Folder>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<Folder>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void { }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<Folder>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: Folder, expand: boolean) {
    if (expand){
      node.isLoading = true;

      const index = this.data.indexOf(node);
      if (index < 0) {
        // If no children, or cannot find the node, no op
        return;
      }

      const children = this._database.getChildren(node).subscribe((data) => {
        node.children = data;

        data.forEach(item => item.level = node.level + 1)
        this.data.splice(index + 1, 0, ...data);

        // notify the change
        this.dataChange.next(this.data);
        node.isLoading = false;

      })
    } else {
      const index = this.data.indexOf(node);
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) { }
        this.data.splice(index + 1, count);

      this.dataChange.next(this.data);
    node.isLoading = false;
    }
  }
}

    @Component({
      selector: 'app-tree',
      templateUrl: './tree.component.html',
      styleUrls: ['./tree.component.css']
    })

    export class TreeComponent {

      constructor(database: DynamicDatabase, private foldersService: FoldersService) {
        this.treeControl = new FlatTreeControl<Folder>(this.getLevel, this.isExpandable);
        this.dataSource = new DynamicDataSource(this.treeControl, database);

        database.getData().subscribe(data => {
          this.dataSource.data = data
        });  
      }

      selectFolder(node: Folder) {
        this.foldersService.setPath(node.path);
        this.foldersService.setIsExpanded(node.expandable);
        this.foldersService.setFolder(node);
      }

      treeControl: FlatTreeControl<Folder>;

      dataSource: DynamicDataSource;

      getLevel = (node: Folder) => node.level;

      isExpandable = (node: Folder) => node.expandable;

      hasChild = (_: number, _nodeData: Folder) => _nodeData.expandable;
    
    }
  
