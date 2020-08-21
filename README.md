### Views

```
PATH                                    NAME              DESCRIPTION
'/'                                     Home              Homepage.
'/profile'                              Profile           User profile.
'/authentication/sign-in'               Sign-in           User signs in.
'/authentication/sign-up'               Sign-up           User signs up.
'/gardens'                              Gardens           All gardens.
'/gardens/new'                          NewGarden         Adds a new garden.
'/gardens/:gardenId'                    SingleGarden      Single Garden.
'/plants'                               Plants            All plants inside that garden.
'/plants/new'                           NewPlant          Adds a new plant.
'/plants/:plantId'                      SinglePlant       Single Plant, info about species, form with tasks.
'/search'                               SearchPlants      Search for plants.
'/search/:id'                           PlantSearched     Single Plant from Search.
'/tasks'                                Tasks             List of tasks.
```

### Rest API Endpoints

```
METHOD    PATH                DESCRIPTION
// Route handlers regarding gardens
GET    -  '/gardens/list'        -  List all gardens.
POST   -  '/gardens'             -  Handle garden creation form submission.
GET    -  '/gardens/:id'         -  Load single garden.
DELETE -  '/gardens/:id'         -  Delete single garden.

// Route handlers regarding plants
GET    -  '/plants/list'        -  List all plants.
POST   -  '/plants'             -  Handle plant creation form submission.
GET    -  '/plants/:id'         -  Load single plant.
DELETE -  '/plants/:id'         -  Delete single plant.
PATCH  -  '/plants/:id'         -  Handle plant editing form submission.

// Route handlers regarding authentication
POST   -  '/authentication/sign-up'     - Handle sign up form submission.
POST   -  '/authentication/sign-in'     - Handle sign in form submission.
POST   -  '/authentication/sign-out'    - Handle sign out form submission.
GET    -  '/authentication/me'          - Load an the authenticated user.

```

### Models

```
// User
{

}
```

```
// Garden
{

}
```

```
// Plant
{

}
```

```
// Tasks
{

}
```
