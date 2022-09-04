import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(400, style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
    trigger('fadeTags', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(400, style({ opacity: 0, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit, OnChanges {
  tags: string[] = [];
  recipeName: string = '';
  allIngredients: string[] = [];
  showMoreTags: boolean = false;
  recipesArr: Recipe[] = [];
  setOrder: string = '';
  isDescOrder: boolean = true;
  closeMsg: boolean = true;

  @Input() tagFilters: { [key: string]: boolean } = {};
  filteredByTagRecipes: Recipe[] = [];

  constructor(private apiServie: ApiService, private modal: NgbModal) {}

  ngOnInit(): void {
    if (localStorage.getItem('likesArr') == null) {
      localStorage.setItem('likesArr', '[]');
    }

    this.apiServie.getAllTags().subscribe((tagsData) => {
      for (let i = 0; i < 4; i++) {
        this.tags = tagsData;
        this.tags.forEach((tag) => {
          this.tagFilters[tag] = true;
        });
      }
    });

    this.apiServie.getRecipes().subscribe((tagsData) => {
      this.recipesArr = tagsData;
    });

    this.apiServie.getAllIng().subscribe((ingData) => {
      this.allIngredients = ingData;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  likeRecipe(ID: string) {
    this.apiServie.addLikedRecipe(ID);
  }

  checkIfThisRecipeIsLiked(ID: string): boolean {
    return this.apiServie.checkIfThisRecipeIsLiked(ID);
  }

  onTagCheckboxChange(e: any) {
    let x = this.tagFilters[e.srcElement.value as string];
    x = x ? false : true;
    // console.log(x)
    // console.log(this.tagFilters)
    return x;
  }

  getSelectedTags(): string[] {
    let tagArr: string[] = [];
    let keys = Object.keys(this.tagFilters);
    let vals = Object.values(this.tagFilters);
    for (let i = 0; i < keys.length; i++) {
      if (vals[i]) {
        tagArr.push(keys[i]);
      }
    }
    return tagArr;
  }

  sort(order: any) {
    this.setOrder = order;
    this.isDescOrder;
  }

  closeMsgAction() {
    this.closeMsg = false;
  }
}
