# bamazon 😀

This is an Amazon-like storefront using MYSQL. The app takes in orders from customers and depletes stock from the store's inventory. The customer will be shown table data and be given option to purchase items. The manager will be able to view inventory and update items. 

<img src="spotify-gif.gif" alt="spotify gif">

## Functionality 💪
#### Here's how the app works: 
1. Show product table data 

`node bamazonCustomer.js`
    1.1. Product table data  

```
        var table = new Table({
            head: [colors.bold(colors.magenta('ID')), colors.bold(colors.magenta('Product Name')), colors.bold(colors.magenta('Department')), colors.bold(colors.magenta('Price')), colors.bold(colors.magenta('Quantity'))]
        });
        
        for (var i = 0; i < res.length; i++) {
            table.push([
                colors.blue(res[i].item_id),
                colors.cyan(res[i].product_name),
                res[i].department_name,
                colors.cyan(res[i].price),
                colors.blue(res[i].stock_quantity)
            ])
        }
```

<img src="table.png" alt="table data">

2. What is the ID of the Product you would like to buy? 🎵

    2.1. How much of the Product would you like to buy?
```
function promptId() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much of the product would you like to purchase?"
        }

    ])
        .then(function (answer) {
            var productId = parseInt(answer.id);
            var productQuantity = parseInt(answer.quantity);
            validateQuantity(productId, productQuantity);
        })
}
```

<img src="productId.png" alt="product id image">

3. Check to see if there is enough quantity of the product



    3.1. This will output the following information to your terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.

    3.2. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

```
if (movie.Response === "False") {
    console.log("Sorry, no movie data found for " + userInput + ". Try another movie title.")
} else {
    console.log("\n----------------------\n");
    console.log(command);
    console.log(userInput);
    console.log("\n----------------------\n");
    console.log("\n****************\n");
    console.log("Title:", movie.Title)
    console.log("Release Year:", movie.Year)
    console.log("IMDB Rating:", movie.Ratings[0].Value)
    console.log("Rotten Tomato Rating:", movie.Ratings[1].Value)
    console.log("Production Country:", movie.Country)
    console.log("Language:", movie.Language)
    console.log("Plot:", movie.Plot)
    console.log("Actors:", movie.Actors)
    console.log("\n****************\n");
    console.log("\n----------------------\n");
}
```
<img src="movie-this.jpg" alt="screen capture of movie.js">

4. Do what it says 💥

 `node liri.js do-what-it-says`

    4.1 Using the fs Node package, LIRI will take the text inside of `random.txt` and then use it to call one of LIRI's commands.


    4.2 It should run `spotify-this-song` for `"I Want it That Way,"` as follows the text in `random.txt`.
    
    4.3 Edit the text in `random.txt` to test out the feature for `movie-this` and `concert-this`.

```
if (data.length > 0) {
var content = data.split(",");
if (content.length === 1) {
    var liriCommand = content[0];
    var liriInput = null;
    actionLog(liriInput);
    startLiri(liriCommand, liriInput);
} else {
    var liriCommand = content[0];
    var liriInput = content[1];
    actionLog(liriInput);
    startLiri(liriCommand, liriInput);
}
```

<img src="dwis.jpg" alt="screen capture of dwis.js">


## Getting Started 🏁

These instructions will get you a copy of the project up and running on your local machine for grading and testing purposes. 

1. Clone repository. Click on the clone button next to the repository (clone with SSH). 
2. Open Terminal and git clone (paste) into directory of your choice. 
3. Open folder in VS Code. 
4. Each JS file is stored in the commands directory. Open the `liri.js` to see the main logic connecting to each of the other files.
5. Open `concert.js` for bands in town information, `movie.js` for omdb information on movies, `spotify.js` for music/song information, `dwis.js` for the `do-what-it-says` logic, `keys.js` stores the id's and keys for each of the api's used. Export makes properties and methods available outside the module file.
6. `.gitignore` stores the files needed for running the application but are kept hidden to avoid unneccessarily pushing them to github. 
7. `error.txt` logs everytime there is an error with time and date of that error. 
8. `log.txt` logs everything typed into the terminal


## Pre-Requisites ✔️

1. Node - use this site to install node into your computer: https://nodejs.org/en/download/
    *to check if node is installed type node -v into your terminal. If installed it will print the version number on the screen.
2. NPM - Node Package Manager. Use this site to assist in downloading packages or modules: https://www.npmjs.com/
3. Create .env file with NPM install. Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
```
npm install dotenv
```


## Built With 🔧

* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
* [Node] (https://nodejs.org/en/download/) - As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications. 
* [Javascript] (https://www.javascript.com/) -JavaScript is the programming language of HTML and the Web
* [JSON] (https://www.json.org/) - Javascript object notation, syntax for storing and exchanging information. 



## Author ⌨️
*** Amanda Dovel *** - [amandadovel](https://github.com/amandadovel)

## Acknowledgments 🌟

* Amber Burroughs, Tutoring badass