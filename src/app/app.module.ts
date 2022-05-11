import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceModule } from './services/index.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutsModule } from './layouts/layouts.module';
import { DBConfig } from 'ngx-indexed-db';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { ComponentsModule } from './components/index.module';

registerLocaleData(en);

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'category',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        // { name: 'id', keypath: 'id', options: { unique: false } },
        // { name: 'images', keypath: 'images', options: { unique: false } },
        // {
        //   name: 'import_datetime',
        //   keypath: 'import_datetime',
        //   options: { unique: false },
        // },
        // {
        //   name: 'trending_datetime',
        //   keypath: 'trending_datetime',
        //   options: { unique: false },
        // },
        // { name: 'rating', keypath: 'rating', options: { unique: false } },
        // { name: 'title', keypath: 'title', options: { unique: false } },
        // { name: 'user', keypath: 'user', options: { unique: false } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'gifs', keypath: 'gifs', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceModule,
    ComponentsModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
