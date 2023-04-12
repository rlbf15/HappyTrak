# scratchproject

Welcome page
* buttons are entire length of screen
* dashboard = login page in file names
* 

Authentication
* how to only route when authenticated

# File Connections

## Backend

### Database
PostgreSQL db -> dataModel.js -> employeeController.js

### Server
server.js -> employeeController.js -> dataModel.js
* Upon a request, go to controller, grab data from Postgres db, back to controller, respond to client

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
Each Reach component is currently housed within the App.jsx component. Currently, none of the other component .jsx files are connected, other than to the App component. Each component is rendered individually/ separate from one another depending on the route taken/ the route provided to the server

## Personal notes for working
confirmEmployer route is only listed in App, it is not included in server.js