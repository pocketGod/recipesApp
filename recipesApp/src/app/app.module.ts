import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { ShowRecipesComponent } from './components/show-recipes/show-recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { TagFilterPipe } from './pipes/tag-filter.pipe';
import { CheckIngredientsPipe } from './pipes/check-ingredients.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule, OrderPipe } from 'ngx-order-pipe';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NgbModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './components/about/about.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ShowRecipesComponent,
    FilterPipe,
    TagFilterPipe,
    CheckIngredientsPipe,
    FavoritesComponent,
    AboutComponent,
    RecipeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    OrderModule,
    NgbModule,
    NgbOffcanvasModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
