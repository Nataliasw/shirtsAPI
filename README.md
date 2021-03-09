# shirtsAPI
Create your own shirts database


## Requirements:
<p>Node.js installed</p>
Postman installed</p>

## Used npm packages:
<p>nodemon</p>
<p>body-parser</p>
<p>express</p>
<p>mongoose</p>


## Getting started:

*  cd to the Project directory
*  initialize npm and install all npm packages that are required
*  Start app.js using nodemon
*  Open Postman application and open new Tab



## Loading all documents from collection:

* Change request to GET and enter request URL: `localhost:3000/shirts`
* Click send



## Adding new document to the collection:

* Change request to POST and enter request URL: `localhost:3000/shirts`
* Go to Body tab and change encoding to: x-www-from-urlencoded
* Inside key column add keys as below:
   * `shirtId`
   * `color`
   * `purchase`
   * `wash`
* Add values to the keys and press send




## Deleting document from the collection:

* Change request to DELETE and enter request URL: `localhost:3000/shirts/:shirtId`
 * where ":shirtId" is an id of your chosen shirt (example: `localhost:3000/shirts/01red`)
* Press send




## Checking how many shirts you have, depending on color

* Change request to GET and enter request URL: `localhost:3000/shirts/color`
 * where "color" is a color of shirts you want to count (example:`localhost:3000/shirsts/red`)
* Press send
