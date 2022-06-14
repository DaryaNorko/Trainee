import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IsCreateService } from 'src/app/_services/is-create.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { path: string},
  public createService: IsCreateService) { }

  ngOnInit(): void {
  }

  isCreate(status:boolean){
    this.createService.setIsCreate(status);
  }

  bthClick(status: boolean){
    if(status){
      
    }
  }

}
