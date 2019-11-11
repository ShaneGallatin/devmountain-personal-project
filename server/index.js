require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session")

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env; 

//Controllers
const ALBUMC = require("./controllers/album_controller");
const AUTHC = require("./controllers/auth_controller");


//Middlewares
const AM = require("./middlewares/auth_middleware");
const CM = require("./middlewares/cart_middleware");

const app = express();

massive(CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log("DB Connected");
    })
    .catch(err => console.log(err));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

app.use(express.json());

//Album Endpoints
app.get("/api/albums", ALBUMC.getAllAlbums); //Gets all listed albums

//Auth Endpoints 

app.post("/auth/register", AUTHC.register); //registers a new user
app.post("/auth/login", AUTHC.login); //logs in a user
app.get("/auth/logout", AM.checkForUser, AUTHC.logout); //checks for a session and then destroys it

//Cart Endpoints
app.use(CM.checkForCart);
app.post("/api/cart/user", AM.checkForUser); //Still needs a connected function. Checks for a user and adds a specific album to the users cart
app.get("/api/cart/user", AM.checkForUser) //Still needs a connected function. checks for a user and gets their specific albums in cart and a total price

//Listing Endpoints 
app.get("/api/listing/user", AM.checkForUser) //checks for a user and gets the albums that the user has listed for sale. 
app.post("/api/listing", AM.checkForUser) //checks for a user and then adds an albums to the list of albums the user is selling

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));