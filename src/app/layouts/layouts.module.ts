import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from '../components/category/category.component';
import { ComponentsModule } from '../components/index.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, MainComponent],
  imports: [CommonModule, ComponentsModule, FormsModule],
  exports: [HeaderComponent, MainComponent],
})
export class LayoutsModule {}
