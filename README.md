# HappyTrak

Welcome page
* buttons are entire length of screen
* dashboard = login page in file names
* 

Authentication
* how to only route when authenticated

# Installation and Running the App

1. Fork and clone the repo. This creates a repo in your Github account
2. Go to the forked version of this repo on your Github account. Click the green "<> Code" button and copy the github url.
3. In your terminal, type `git clone <paste copied url here>`
4. Install dependencies by running `npm install` in your terminal.
5. To view the app in your browser and see live changes, run `npm run dev` in your terminal.

# How to Use

To use this project, the developer must have knowledge of Javascript for modyfiying the backend and the front end, as the frameworks and technologies behind this project run on this language. 

The front end makes requests to an api point that has been isolated in its own router, making the server files modular allowing the developer to easily modify routes to without compromising other components. The front end 

Authentication and session control uses a no SQL database and the employee information uses a SQL database. The developer must create their own databases and add the respective URI's to the `/server/models/dataModel` and `/server/models/employerModel` files


# Credits

### Idea and original creation of the app:

Christina
* Github: CElizOwens

Giovana
* Github: giovanacdlc

Iris
* Github: wiris316

Rachel
* Github: rachelk585

### Iteration update

Alejandro
* Github: AlejandroFlorez

Jon
* Github: Jrcrz

Kasey
* Github: kaseywolff

Matteo
* Github: MatteoDiter


# File Connections

## Backend

### Database
PostgreSQL database -> dataModel.js -> employeeController.js
MongoDB -> employerModel.js -> employerController.js

### Server
server.js -> employeeController.js -> dataModel.js
* Upon request (in server), go to controller, grab data from Postgres db (via path described above), back to controller, respond to client

server.js -> employerController.js -> employerModel.js
* Upon request (in server), go to controller, grab data from Postgres db (via path described above), back to controller, respond to client

## Routes
* Entry point for application is ./src/index.js
    * Browser Router is used in entry point when root is rendered
    * index.html and index.js are connected by id="root"
    * Within index.js, root is rendered using the Browser Router listed above
    * Browser Router wraps the App component
* App component contains Routes to other components, using paths defined in the server
    * path='/'
        * get request in server.js to '/' -> populate Dashboard.jsx component and render to web browser page

## Frontend
Each React component is currently housed within the App.jsx component. Currently, none of the other component .jsx files are connected, other than to the App component. Each component is rendered individually/ separate from one another depending on the route taken/ the route provided to the server.

