import { GifComponent } from './gif/gif.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [GifComponent, CategoryComponent, UploadComponent],
  imports: [CommonModule],
  exports: [GifComponent, CategoryComponent, UploadComponent],
})
export class ComponentsModule {}
