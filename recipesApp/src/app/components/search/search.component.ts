import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  userName: string = 'UserName';
  recipesCounter: number = 99;

  recipesArr: any[] = [
    {
      name: '2-Ingredient Crepes (Gluten Free)',
      amount: 4,
      img: 'https://i2.supercook.com/a/c/2/b/ac2b95e0d90ae07cb88307c9618edc9a-0.jpg',
    },
    {
      name: 'Canned Tomato Juice',
      amount: 2,
      img: 'https://i2.supercook.com/f/f/8/7/ff87fe8586629364b1edbb40a41a9981-0.jpg',
    },
    {
      name: 'Grill Chicken Breasts',
      amount: 5,
      img: 'https://i2.supercook.com/7/5/b/4/75b495d6a9bb761f19f3cb1842c90e64-0.jpg',
    },
    {
      name: 'Sous Vide Chicken Breast',
      amount: 'all',
      img: 'https://i2.supercook.com/8/9/6/9/8969b15902504ee5d74c87e606814944-0.jpg',
    },
    {
      name: 'Healthy chicken recipes',
      amount: 6,
      img: 'https://i2.supercook.com/c/4/d/e/c4de05142f91ff91e819ae9af3ee23fe-0.jpg',
    },
    {
      name: 'Healthy Baked Apples with Maple Pecans',
      amount: 8,
      img: 'https://i2.supercook.com/9/f/a/8/9fa8e5bae6c3f42b72d55e5869b654a7-0.jpg',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
