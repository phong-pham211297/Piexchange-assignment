import { GifComponent } from './gif/gif.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [GifComponent, CategoryComponent],
  imports: [CommonModule],
  exports: [GifComponent, CategoryComponent],
})
export class ComponentsModule {}
