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

from .models import User, Recipe, Ingredient
from django.conf import settings
import requests
import json

'''
def call_API(request):
    foodName = request.GET.get('foodName')

    print(settings.API_KEY)
    url = f'https://api.spoonacular.com/food/ingredients/search?apiKey={settings.API_KEY}&query={foodName}'

    #f'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={settings.API_KEY}&query={foodName}'
    r = requests.get(url)
    print(r)  # 200
    return render(request, "mplan/index.html", {
        'r': r
    })
'''

def food_API(request, foodName):
    #foodName = request.GET.get('foodName')
    dataType = 'Survey (FNDDS)'
    url = f'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={settings.API_KEY}&ds=Standard%20Reference&query={foodName}&dataType={dataType}&pageSize=10'
    r = requests.get(url)
    #print(r.json)  # 200
    #print(url)
    r = r.json()
    return JsonResponse(r, safe=False)

def ingredient_API(request, ingredientId):
    url = f'https://api.nal.usda.gov/fdc/v1/food/{ingredientId}?api_key={settings.API_KEY}'
    r = requests.get(url)
    #print(r.json)  # 200
    r = r.json()
    return JsonResponse(r, safe=False)

def index(request):
    all_recipes = Recipe.objects.all()
    #Get unique values from category query
    all_categories = Recipe.objects.values('category').distinct().exclude(category__exact='')
    return render(request, "mplan/index.html", {
                    "all_categories": all_categories,     
                    "all_recipes": all_recipes})

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
    print('im here'*100)
    return render(request, "mplan/create_recipe.html")
    '''
    if request.method == "POST":
        global test    
        test = test + 1
        if test %2 == 0:
            return HttpResponseRedirect(reverse("index"))
        print(f' {test} '* 100)
        data = json.loads(request.body) 
        data2 = data['ingredientList'].name
        print(data2)
        recite_id = data["id"]
        new_post = data["post"]
        recipe_data = data["data"]

        print(new_post)

        return HttpResponseRedirect(reverse("index"))
        name = request.POST["name"]
        category = request.POST['category']
        description = request.POST["description"]
        ingredients = request.POST['ingredients']
        owner = request.POST['owner']
        user_owner = User.objects.get(username=owner)
        try:
            Listings_created = Listing(name=name, category=category, starting_bid=starting_bid, description=description, url=url, owner=user_owner)
            Listings_created.save()
            return HttpResponseRedirect(reverse("index"))
        except IntegrityError:

            return render(request, "mplan/create_recipe.html", {
                "message": "Listing not created."
            })'''

@login_required
def create_recipe_api(request):
    print('im here'*10)
    if request.method == "POST":
        data_json = json.loads(request.body)
        print(data_json)
        username = data_json['username']
        user = User.objects.get(username=username)
        name = data_json['name']
        category = data_json['category']
        description = data_json['description']
        Recipe_created = Recipe(name=name, description=description, category=category, creator=user)
        Recipe_created.save()
        for i in data_json['ingredientList']:
            Ingredient_created = Ingredient(food_id=i['id'],  name=i['name'], amount=i['amount'])
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
    return render(request, "mplan/recipe.html", {
        "recipe": recipe_item
    })