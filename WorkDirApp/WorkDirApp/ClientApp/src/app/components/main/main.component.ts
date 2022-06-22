import { Component, Input, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/_services/folders.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { IsCreateService } from 'src/app/_services/is-create.service';
import { HttpClient } from '@angular/common/http';
import { FormDto } from 'src/app/models/formDto';
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
  formDto: FormDto = { path: "", file: new File([], "", null)};

  constructor(private foldersService: FoldersService, public dialog: MatDialog,
    public createService: IsCreateService, public http: HttpClient) {
  }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   path: new FormControl('', Validators.required),
    //   file: new FormControl('', Validators.required),
    // });
  }

  ngAfterContentChecked() {
    this.folderPath = this.foldersService.getPath();
    this.isExpandable = this.foldersService.getIsExpanded();
  }

  showModal(form) {
    // let formParams = new FormData();
    // formParams.append('path', this.folderPath);
    // formParams.append('file', form.value.file);
    this.formDto.file = form.value.file;
    this.formDto.path = this.folderPath;

    if (this.isExpandable) {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: { path: this.folderPath},
        height: '300px',
        width: '500px',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.isCreate = this.createService.getIsCreate();
        console.log(`${this.folderPath}`); 
        console.log(`${form.value.file}`); 

        // console.log(this.formDto.path);
        // console.log(`${this.folderPath}`);
        // console.log(form.value.file);
        // console.log(`${form.value.file}`); 

        if (this.isCreate) {
          this.http.post(this.urlClearAndCreate, this.formDto);
          console.log(`${this.formDto.file}`) // убрать
        } else {
          this.http.post(this.urlAppend, this.formDto);
          console.log(`${this.formDto.file}`)
        }
      })
    } else {
      // редактировать
      this.http.post(this.urlAppend, this.formDto);
      // console.log(`${form.file}`)
    }
  }
}
