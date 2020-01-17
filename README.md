# Sprint Challenge: Express and Node.js - Projects & Actions

## Description

In this challenge, you design and create a web API to manage the following resources: `Projects` and `Actions`.

## Instructions

**Read these instructions carefully**. Understand exactly what is expected **_before_** starting to code.

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency of the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add your _Team Lead_ as collaborator on Github.
- [ ] Clone your forked version of the Repository.
- [ ] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge `firstName-lastName` Branch into master on **your fork, don't make Pull Requests against Lambda's repository**.
- [ ] Please don't merge your own pull request.
- [ ] Add your _Team Lead_ as a Reviewer on the Pull-request
- [ ] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

- [ ] Mention two parts of Express that you learned about this week.


1. One part is the Router() method that creates a router object. You can use it like a mini-application and add middleware and HTTP method routes (GET, etc.) to it. It’s handy because you can use a router for a particular root URL and separate your routes into different files.

2. Another part is the request object, usually referred to as req. It has properties that can be handy to access, such as req.body, req.headers, req.method, and req.params. Extension methods can be added to the request object, too. (Extension methods are more commonly added to the response object, such as res.status() and res.send().)

You can even add more properties to the request object, like in this validateUserId() middleware, which adds the response from querying the database to a req.user property:

function validateUserId(req, res, next) {
 
  userDb.getById(req.params.id)
    .then(response => {
        req.user = response.data;
        next();
    })
    .catch(err => {
      res.status(400).json({message: "invalid user id"})
    });
};

- [ ] Describe Middleware?

Middleware, when talking about Express, are functions that are used in a sequence. They have access to the req, res, and err objects, and to the next function in the request flow. They can be used globally in an application, or just applied to a specific route. If they don’t return a status code or call end(), they must call next() to keep the flow going (otherwise the request is left hanging). 

They can do these things: 

    Execute code.

    Make changes to  req & res.

    End the request.

    Call the next middleware.

- [ ] Describe a Resource?

A resource is a thing that an application cares about and something we want to manage with our application. It is a noun in the ‘application domain.’ For example, in an e-commerce application, it could be the users, products, orders, etc. Then the application would have endpoints (URLs) that point to the locations of those resources available on a server.

- [ ] What can the API return to help clients know if a request was successful?

We can call res.status(<HTTP response status code goes here>), which will send the response status code back to the clients. Successful status codes are in the 200s, and they include:

200 = the request has succeeded

201 = created

202 = accepted, but not yet acted upon

204 = accepted, but no content to send back. However, the headers could be useful.

Alternatively, we can send a status code in the 400s or 500s, depending on the situation, if the request was not successful.

- [ ] How can we partition our application into sub-applications?

We can use Express Routers to split the application into smaller ones that handle different routes related to the different resources in the application, such as a router for paths dealing with users (‘/api/users’) and another one with posts (‘/api/posts’). 

In this example, in both /users/user-routes.js and /posts/post-routes.js, we would use const router = express.Router(); router.get(‘/’) etc. and module.exports = router.

Then in an api/server.js file, we would import the routes. 

const userRouter = require(‘../users/user-routes.js’); 

const postRouter = require(‘../posts/post-routes.js’); 

Then we would have the server use those routes:

server.use(‘/api/users’, userRouter);

server.use(‘/api/posts’, postRouter);

We could also put other files related to the users inside the user folder, and files related to the posts in the posts folder.


## Minimum Viable Product

- [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

- [ ] Perform CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
- [ ] Retrieve the list of actions for a project.

Please read the following sections before implementing the Minimum Viable Product, they describe how the database is structured and the files and methods available for interacting with the data.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

### Database Persistence Helpers

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

## Stretch Goal

- Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- From the React application show a list of all _projects_ using the API you built.
- Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
- Add styling!
