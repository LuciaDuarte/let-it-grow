### Views

```
PATH                                    NAME              DESCRIPTION
'/'                                     Dashboard         Dashboar: Overview of all gardens and tasks.
'/profile'                              Profile           User profile.
'/authentication/sign-in'               Sign-in           User signs in.
'/authentication/sign-up'               Sign-up           User signs up.
'/gardens/:gardenId'                    SingleGarden      Single Garden.
'/plants/:plantId'                      SinglePlant       Single Plant, info about species, form with tasks.
'/plants/edit/:plantId'                 EditSinglePlant   Edit Single Plant info
'/search'                               SearchPlants      Search for plants.
'/search/:id'                           PlantSearched     Single Plant from Search.
'/tasks'                                Tasks             List of tasks.
```

### Rest API Endpoints

```
METHOD       PATH                       DESCRIPTION
// Route handlers regarding gardens
GET     -  '/gardens/list'           -  List all gardens.
POST    -  '/gardens/new'            -  Handle garden creation form submission.
GET     -  '/gardens/single'         -  Load single garden.
POST    -  '/gardens/delete/:id'     -  Delete single garden.

// Route handlers regarding plants
GET     -  '/plants/list'            -  List all plants.
POST    -  '/plants/new'             -  Handle plant creation form submission.
GET     -  '/plants/single'          -  Load single plant.
POST    -  '/plants/delete/:id'      -  Delete single plant.
POST    -  '/plants/edit/:id'        -  Handle plant editing form submission.

// Route handlers regarding tasks
GET     -  '/tasks/list/all          -  List all tasks from an user.
GET     -  '/tasks/list/single       -  List all tasks from an specific plant.
POST    -  '/tasks/new'              -  Handle tasks creation form submission.
POST    -  '/tasks/update'           -  Update single task.

// Route handlers regarding authentication
POST    -  '/authentication/sign-up'   - Handle sign up form submission.
POST    -  '/authentication/sign-in'   - Handle sign in form submission.
POST    -  '/authentication/edit'      - Handle edit form submission.
POST    -  '/authentication/sign-out'  - Handle sign out form submission.
GET     -  '/authentication/me'        - Load an the authenticated user.

// Route handlers regarding openfarm
GET     -  '/openfarm/list'            - Handle search query.
GET     -  '/openfarm/single'          - Retrieves plant info.
```

### Models

```
// User
{
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}
```

```
// Garden
{
name: {
    type: String,
    trim: true,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant'
    }
  ]
}
```

```
// Plant
{
  nickname: {
    type: String,
    required: true
  },
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garden'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  apiId: {
    type: String
  },
  image: String
}
```

```
// Tasks
{
  task: {
    type: String,
    required: true
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garden'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  done: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    required: true
  }
}
```
