# Mealplan

## About

Recipe creator that provides the ability to create a recipe describing the cooking process and the ability to count the amount of nutritional value per dish.
To implement search was used [U.S. Department of Agriculture, Agricultural Research Service. FoodData Central API](https://fdc.nal.usda.gov/api-guide.html) - database of food and its nutritional value.

Project made as part of [HarvardX CS50’s Web Programming with Python and JavaScript](https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript) course by Brian Yu & David J. Malan.

## Features

  - Create recipe and select its ingredients using USDA FoodData Central API
  - View recipe page with summary of selected ingredients and their nutritional value.
  - Edite recipe
  - Delete recipe
  - Search in the list of all created recipes or recipes divided by category
  
## How to run

    python manage.py runserver

## Files & Directories

  - templates\mplan - HTML templates (layout, index, register, create_recipe etc)
  - static\mplan - CSS and JS files
  - migrations - database files

  - views.py - all functions for main logic of webapp
  - urls.py - created url paths
  - models.py - contains the essential fields and behaviors of the storing data


