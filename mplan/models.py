from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Listing(models.Model):
    name = models.CharField(max_length=64)
    ingredients = models.ManyToManyField('User', blank=True, related_name='ingredients')
    description = models.CharField(max_length=4096)
    category = models.CharField(max_length=64, blank=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')

    def __str__(self):
        return f"{self.name} {self.starting_bid}$ {self.owner}"  

class Products(models.Model):
    name = models.CharField(max_length=64)
    category = models.CharField(max_length=64, blank=True)

