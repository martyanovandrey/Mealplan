from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('create_recipe', views.create_recipe, name='create_recipe'),
    path('create_recipe_api', views.create_recipe_api, name='create_recipe_api'),
    path('food/<str:foodName>', views.food_API, name='food'),
    path('ingredient/<int:ingredientId>', views.ingredient_API, name='ingredient'),
    path("<int:recipe_id>", views.recipe, name="recipe"),
    path("category/<str:category>", views.category, name="category"),
    path("delete_recipe", views.delete_recipe, name="delete_recipe"),
    path("edit_recipe/<int:recipeId>", views.edit_recipe, name="edit_recipe"),
    path('edit_recipe_api', views.edit_recipe_api, name='edit_recipe_api')
    ]