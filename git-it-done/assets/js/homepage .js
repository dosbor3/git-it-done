/*
By the end of 6.1, fetch() API was used to make an HTTP request to the GitHub APL, and a response formatted in JSON was retrieved.
At this point, we still need to allow users to search for any GitHub Account they want, and we need to display the data to the page.
Currentlyk, we have the request hardcoded to a specific URL, meaning that the HTTP request will alwas search for the same GitHub 
account.

We will use HTML and browser events to capture dynamic user input to search for different GitHub accounts.  Then we'll interate the 
response data through each repository's data, and we'll display the important parts of it to the page.

In this lesson (6.2) we will collect user input to form HTTP request, use an HTTP request's response to display data to the user, 
and handle errors that may occur when working wiht server-side APIs

Steps:
1.  Add an event listener to the <form> element to eecute a function on submission
2.  Capture the form's input datat to use elsewhere in the app
3.  Use the input data to fetch repos from the GitHub API

*/


//variable to store a reference to the <form> element with an id of "user-form"
var userFormEl = document.querySelector("#user-form");

//variable to store a reference to the <input> element with an id of username
var nameInputEL = document.querySelector("#username");

//creating the formSubmitHandler function to be executed upon a form submission browser event
var formSubmitHandler = function(event) {
    //remember that we must pass the event parameter to it to enable bubling
    //don't forget to stop the defaults for events
    event.preventDefault();
    console.log(event);
}

//fuction to fetch the user repos from the GitHub API
var getUserRepos = function(user) {     
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response) {        
        response.json().then(function(data) {
            console.log(data);
        });

    });
};

userFormEl.addEventListener("submit", formSubmitHandler);