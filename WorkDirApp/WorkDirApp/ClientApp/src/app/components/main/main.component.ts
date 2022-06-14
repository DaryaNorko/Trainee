import { Component, Input, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/_services/folders.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { NgForm } from '@angular/forms';
import { IsCreateService } from 'src/app/_services/is-create.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isCreate: boolean;


  @Input() folderPath: string = "";
  isExpandable: boolean;
  urlAppend = "https://localhost:5001/Folder/appendDirectory";  // написать url

  constructor(private foldersService: FoldersService, public dialog: MatDialog,
    public createService: IsCreateService, public http: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.folderPath = this.foldersService.getPath();
    this.isExpandable = this.foldersService.getIsExpanded();
  }

  showModal(form: NgForm) {
    if (this.isExpandable) {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: { path: this.folderPath },
        height: '300px',
        width: '500px',
      });

      dialogRef.afterClosed().subscribe(() =>{
        this.isCreate = this.createService.getIsCreate();
        if (this.isCreate) {
          this.http.post(this.urlAppend, form);
          console.log(`${this.isCreate}`)
        } else if (!this.isCreate) {
          // просто создаём
          this.http.post(this.urlAppend, form);
          console.log(`${this.isCreate}`)
        } else return;       
      })

      
    }
  }
}
