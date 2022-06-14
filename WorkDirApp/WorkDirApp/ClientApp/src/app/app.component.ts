import { Component } from '@angular/core';
import { Input } from 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentFolder: string="";
  title = 'Work';
}
