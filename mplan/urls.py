from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('create_recipe', views.create_recipe, name='create_recipe'),
    path('food/<str:foodName>', views.call_API, name='food')
    ]