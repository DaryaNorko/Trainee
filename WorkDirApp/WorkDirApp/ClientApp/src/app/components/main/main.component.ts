import { Component, Input, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/_services/folders.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() folderPath: string = "";
  url="https://localhost:5001/Folder/createDirectory";

  constructor(private foldersService: FoldersService) {
   }

  ngOnInit(): void {
  }

  ngAfterContentChecked(){
    this.folderPath = this.foldersService.getPath();
  }


}
