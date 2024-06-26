import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipes(this.id)
      }
    );
  }

  onAddtoShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo :this.route});
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
