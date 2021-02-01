from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.db.models import Max
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
import time

from .models import User, Recipe, Ingredient
from django.conf import settings
import requests
import json

def food_API(request, foodName):
    #foodName = request.GET.get('foodName')
    dataType = 'Survey (FNDDS)'
    url = f'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={settings.API_KEY}&ds=Standard%20Reference&query={foodName}&dataType={dataType}&pageSize=10'
    r = requests.get(url)
    r = r.json()
    return JsonResponse(r, safe=False)

def ingredient_API(request, ingredientId):
    url = f'https://api.nal.usda.gov/fdc/v1/food/{ingredientId}?api_key={settings.API_KEY}'
    r = requests.get(url)
    r = r.json()
    return JsonResponse(r, safe=False)

def index(request):
    all_recipes = Recipe.objects.all()
    #Get unique values from category query
    all_categories = Recipe.objects.values('category').distinct().exclude(category__exact='')
    return render(request, "mplan/index.html", {
                    "all_categories": all_categories,     
                    "all_recipes": all_recipes})

def redirect(request):
    all_recipes = Recipe.objects.all()
    #Get unique values from category query
    all_categories = Recipe.objects.values('category').distinct().exclude(category__exact='')
    return render(request, "mplan/index.html", {
                    "all_categories": all_categories,     
                    "all_recipes": all_recipes})

def category(request, category):
    Recipe_category = Recipe.objects.filter(category=category)
    #Get unique values from category query
    all_categories = Recipe.objects.values('category').distinct().exclude(category__exact='')
    return render(request, "mplan/index.html", {
                    "category": category,
                    "all_categories": all_categories,     
                    "all_recipes": Recipe_category})                    

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "mplan/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "mplan/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "mplan/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "mplan/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "mplan/register.html")

@login_required
def create_recipe(request):
    return render(request, "mplan/create_recipe.html")
    
@login_required
def create_recipe_api(request):

    if request.method == "POST":
        data_json = json.loads(request.body)

        username = data_json['username']
        user = User.objects.get(username=username)
        name = data_json['name']
        category = data_json['category']
        description = data_json['description']
        Recipe_created = Recipe(name=name, description=description, category=category, creator=user)
        Recipe_created.save()

        for i in data_json['ingredientList']:
            Ingredient_created = Ingredient(food_id=i['id'],  name=i['name'], amount=i['amount'], protein=i['protein'], fat=i['fat'], carb=i['carb'], energy=i['energy'])
            if Ingredient.objects.filter(food_id=i['id'],  name=i['name'], amount=i['amount']).exists():

                Igredient_old = Ingredient.objects.get(food_id=i['id'],  name=i['name'], amount=i['amount'])
                Recipe_created.ingredient.add(Igredient_old)
            else:

                ''' Add recipe to ingredient
                Recipe_get = Recipe.objects.get(name=name, description=description, category=category, creator=user)
                Ingredient_created = Ingredient(food_id=i['id'],  name=i['name'], amount=i['amount'], recipe=Recipe_get, protein=i['protein'], fat=i['fat'], carb=i['carb'], energy=i['energy'])
                '''
                Ingredient_created.save()
                Recipe_created.ingredient.add(Ingredient_created)  
    return render(request, "mplan/index.html")


@login_required
def recipe(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
        curent_user = request.user.id  
    except Recipe.DoesNotExist:
        raise Http404("Recipe not found.")
    recipe_item = Recipe.objects.get(id = recipe_id)
    summProtein = 0
    summFat = 0
    summCarb = 0
    summEnergy = 0
    for i in recipe_item.ingredient.all():
        summProtein += i.protein
        summFat += i.fat
        summCarb += i.carb
        summEnergy += i.energy
    return render(request, "mplan/recipe.html", {
        "recipe": recipe_item,
        'summProtein': summProtein,
        'summFat': summFat,
        'summCarb': summCarb,
        'summEnergy': summEnergy
    })

@login_required
def delete_recipe(request):
    if request.method == "POST":
        data_json = json.loads(request.body)
        id = data_json['id']
        Recipe.objects.filter(id=id).delete()

@login_required
def edit_recipe(request, recipeId):
    
    recipe = Recipe.objects.get(id=recipeId)
    return render(request, "mplan/edit_recipe.html", {
            'recipe': recipe
    })

@login_required
def edit_recipe_api(request):
    if request.method == "PUT":
        data_json = json.loads(request.body)

        id = data_json['id']
        username = data_json['username']
        user = User.objects.get(username=username)
        name = data_json['name']
        category = data_json['category']
        description = data_json['description']
        Recipe_update = Recipe.objects.get(id=id)
        Recipe_update.name = name
        Recipe_update.description = description
        Recipe_update.category = category
        Recipe_update.save()
        for i in data_json['deleteIngredients']:
            Ingredient.objects.get(id=i).delete()
        for i in data_json['ingredientList']:
            Ingredient_created = Ingredient(food_id=i['id'],  name=i['name'], amount=i['amount'], protein=i['protein'], fat=i['fat'], carb=i['carb'], energy=i['energy'])
            if Ingredient.objects.filter(food_id=i['id'],  name=i['name'], amount=i['amount']).exists():
                Igredient_old = Ingredient.objects.get(food_id=i['id'],  name=i['name'], amount=i['amount'])
                Recipe_update.ingredient.add(Igredient_old)
            else:
                Ingredient_created.save()
                Recipe_update.ingredient.add(Ingredient_created) 
                
                 
    return HttpResponse(status=204)
