import { Component, Input, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/_services/folders.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { IsCreateService } from 'src/app/_services/is-create.service';
import { HttpClient } from '@angular/common/http';
import { FormDto, FormDto2 } from 'src/app/models/formDto';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() folderPath: string;
  isExpandable: boolean;
  urlAppend = "https://localhost:5001/Folder/appendDirectory";
  urlClearAndCreate = "https://localhost:5001/Folder/clearAndCreateDirectory";
  isCreate: boolean;
  file: File;
  fileName: string;
  // formDto: FormDto = { path: "", file: new File([], "", null) }; // удалить dto

  constructor(private foldersService: FoldersService, private toastr: ToastrService, public dialog: MatDialog,
    public createService: IsCreateService, public http: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.folderPath = this.foldersService.getPath();
    this.isExpandable = this.foldersService.getIsExpanded();
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  showModal() {
    if (!this.folderPath) {
      this.toastr.error("Please, select a directory", "Warning!", {
        timeOut: 3000,
      });
      return;
    }

    if (this.file) {
      let formParams = new FormData();
      formParams.append('path', this.folderPath);
      formParams.append('file', this.file);

      if (this.isExpandable) {
        const dialogRef = this.dialog.open(ModalComponent, {
          data: { path: this.folderPath },
          height: '300px',
          width: '500px',
        });

        dialogRef.afterClosed().subscribe(() => {
          this.isCreate = this.createService.getIsCreate();

          if (this.isCreate) {
            const upload$ = this.http.post(this.urlClearAndCreate, formParams);
            upload$.subscribe();
          } else {
            const upload$ = this.http.post(this.urlAppend, formParams);
            upload$.subscribe();
          }
        })
      } else {
        const upload$ = this.http.post(this.urlAppend, formParams);
        upload$.subscribe();
      }
    }
  }
}
