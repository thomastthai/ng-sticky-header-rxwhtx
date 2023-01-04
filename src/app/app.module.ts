import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScrollService } from './scroll.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule],
  declarations: [AppComponent, HeaderComponent],
  bootstrap: [AppComponent],
  providers: [ScrollService]
})
export class AppModule { }
