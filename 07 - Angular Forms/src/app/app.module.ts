import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MainComponent } from './pages/main/main.component';
// import { GalleryComponent } from './pages/gallery/gallery.component';
// import { ContactComponent } from './pages/contact/contact.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FormsModule } from '@angular/forms';
// import { ListComponent } from './pages/gallery/list/list.component';
// import { ViewerComponent } from './pages/gallery/viewer/viewer.component';
// import { DateFormatPipe } from './shared/pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // MainComponent,
    // GalleryComponent,
    // ContactComponent,
    MenuComponent,
    // ListComponent,
    // ViewerComponent,
    // DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
