import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxTreeModule } from 'igniteui-angular';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { TreeComponent } from './components/tree/tree.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MainComponent } from './components/main/main.component';
import { FoldersService } from './_services/folders.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TreeComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IgxTreeModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [FoldersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
