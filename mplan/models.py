from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Recipe(models.Model):
    name = models.CharField(max_length=64)
    ingredient = models.ManyToManyField('Ingredient', blank=True, related_name='ingredient')
    description = models.CharField(max_length=4096)
    category = models.CharField(max_length=64, blank=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')

    def __str__(self):
        return f"{self.creator} {self.name}"  

class Ingredient(models.Model):
    food_id = models.IntegerField()
    name = models.CharField(max_length=512, blank=True)
    amount = models.IntegerField(blank=True, null=True)
    recipe = models.ManyToManyField('Recipe', blank=True, related_name='recipe')

    def __str__(self):
        return f"{self.name} {self.amount}"  
