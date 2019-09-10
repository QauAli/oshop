import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.css']
})
export class CategoryPanelComponent implements OnInit {

  categories$;
  @Input('activeCategory') activeCategory;

  constructor(public categoryService:CategoryService) { 
    
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

}
