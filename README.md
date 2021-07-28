# Mealplan

## About

Recipe creator that provides the ability to create a recipe describing the cooking process and the ability to count the amount of nutritional value per dish.
To implement search was used [U.S. Department of Agriculture, Agricultural Research Service. FoodData Central API](https://fdc.nal.usda.gov/api-guide.html) - database of food and its nutritional value.

Project made as part of [HarvardX CS50’s Web Programming with Python and JavaScript](https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript) course by Brian Yu & David J. Malan.

## Features

  - **Create recipe and select its ingredients using USDA FoodData Central API**
      <img src='https://user-images.githubusercontent.com/37772440/106514882-e78d0800-64e5-11eb-8c62-5667ce23e920.jpg'>
      
    ___
      <img src='https://user-images.githubusercontent.com/37772440/106513955-b3651780-64e4-11eb-91ea-e484eff36e26.jpg'>
      
    ___
      <img src='https://user-images.githubusercontent.com/37772440/106513959-b4964480-64e4-11eb-8b33-4fcfe8585cf8.jpg'>

  
  - **View recipe page with summary of selected ingredients and their nutritional value.**
      <img src='https://user-images.githubusercontent.com/37772440/106513961-b5c77180-64e4-11eb-9ba7-08f3be253511.jpg'>

  
  - **Edite recipe**
      <img src='https://user-images.githubusercontent.com/37772440/106513965-b6600800-64e4-11eb-92bc-6c5d1959a34a.jpg'>
  
  - **Delete recipe**
  
  - **Search in the list of all created recipes or recipes divided by category**
  
## How to run

    python manage.py runserver

## Files & Directories

  - templates\mplan - HTML templates (layout, index, register, create_recipe etc)
  - static\mplan - CSS and JS files
  - migrations - database files

  - views.py - all functions for main logic of webapp
  - urls.py - created url paths
  - models.py - contains the essential fields and behaviors of the storing data

  ___
  ## Video demo
  [![video](https://user-images.githubusercontent.com/37772440/120629062-1607f900-c46e-11eb-9966-244a5bcbdd9c.png)](http://www.youtube.com/watch?v=yWvHa_mjhYg)
