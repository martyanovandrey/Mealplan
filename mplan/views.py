from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseBadRequest, HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.db.models import Max
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required

from .models import User
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

def call_API(request, foodName):
    #foodName = request.GET.get('foodName')
    print(settings.API_KEY)
    dataType = 'Survey (FNDDS)'
    url = f'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={settings.API_KEY}&ds=Standard%20Reference&query={foodName}&dataType={dataType}&pageSize=10'
    r = requests.get(url)
    print(url)
    print(r.json)  # 200
    return JsonResponse({"error": "POST/PUT request required."}, status=400)

def index(request):

    return render(request, "mplan/index.html")

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
    '''
    if request.method == "POST":
        name = request.POST["name"]
        category = request.POST['category']
        starting_bid = request.POST["starting_bid"]       
        description = request.POST["description"]
        url = request.POST["url"]
        owner = request.POST['owner']
        user_owner = User.objects.get(username=owner)
        try:
            Listings_created = Listing(name=name, category=category, starting_bid=starting_bid, description=description, url=url, owner=user_owner)
            Listings_created.save()
            return HttpResponseRedirect(reverse("index"))
        except IntegrityError:
            return render(request, "mplan/create_recipe.html", {
                "message": "Listing not created."
            })   
    '''     
    return render(request, "mplan/create_recipe.html")