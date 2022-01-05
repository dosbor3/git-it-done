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
4.  Create containers  on the HTML doc to display the data dynamically
5.  Display the repository Data dynamically

*/


//variable to store a reference to the <form> element with an id of "user-form"
var userFormEl = document.querySelector("#user-form");

//variable to store a reference to the <input> element with an id of username
var nameInputEl = document.querySelector("#username");

//variable to store a reference to the div element with an id of #repos-container
var repoContainerEl = document.querySelector("#repos-container");

//variable to store a reference to the span element with an id of #repo-search-term
var repoSearchTerm = document.querySelector("#repo-search-term");

//creating the formSubmitHandler function to be executed upon a form submission browser event
var formSubmitHandler = function(event) {
    //remember that we must pass the event parameter to it to enable bubling
    //don't forget to stop the defaults for events
    event.preventDefault();

    // get value from input element and remove the blank spaces at the end of the input, store it in the username variable
    var username = nameInputEl.value.trim();

    if (username) { //<--- if the username is not blank, null, or empty pass it into the getUserRepos()
        getUserRepos(username);

        nameInputEl.value = ""; //<--- clear the form input element's value 
    }
    else {  //else, if the username is blank, empty, or null, alert the user to enter a GitHub username
        alert("Please enter a GitHub username");
    }
}

//fuction to fetch the user repos from the GitHub API
var getUserRepos = function(user) {     
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl) .then(function(response) {
        //updating the getUserRepos function to control how the app reacts to a 404 (the request is understood, but the request
        // is searching for something that doesn't exist)

        // request was successful
        if (response.ok) {  //<--- the ok property that's bundled in the response object from fetch(), when HTTP request status 
                            //code is something in the 200s, the ok property will be true.  if the ok property is false, we know 
                            //that something is wrong with the HTTP request, so we set a custom alert message to let the user know
                            //that their seach was unsuccessful
            response.json().then(function(data) {
            displayRepos(data, user);
        });
        } 
        else {
            alert('Error: GitHub User Not Found');
        }
    })       
        // **|**|**|**|**|**|**|**|**|**|**|**|**|**   CATCH NETWORK ERRORS  **|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|
        .catch(function(error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
        });
    }

    //creating a function to display Repos, this function will accept both the array of repository (data)  and the term we 
    //searched for as parameters.  For example, the repos array and the user that we searched for.  We first checked to 
    //make sure that the function was receiving the data, next we added an HTML container for the content.  The data will get 
    //displayed on the right column of the page.  The column was set up previously in the HTML file, but there still need to be
    //a unique way in the HTML that we can selet and write the data to.  So we updated the HTML file and added a span element to 
    //write the search term to, and an empty div to write all of the repository data to.... Now we must add a reference to both 
    //of the new elements at the top of this js page.
    var displayRepos = function(repos, searchTerm){
        // **|**|**|**|**|**|**|**|**|**|**|**|**|**   USER HAS NO REPOSITORIES  **|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|

        //Now, what happens if the user exist, but the user doesn't have any repos.  The HTTP request will run, but return a 404 and
        //return an empty array, resulting in a blank page.  This could be confussing to the user, so to combat this, we will check 
        //for an empty array and let the user know if there's nothing to display.

        // check if api returned any repos
        if (repos.length === 0) {
            repoContainerEl.textContent = "No repositories found.";
            return;
        } 
    
        //Always clear out the old contant before displaying new content
        repoContainerEl.textContent = "";
        repoSearchTerm.textContent = searchTerm;    //remember to test the functions as we write them
        
        // loop over repos
        for (var i = 0; i < repos.length; i++) {
            // format repo name
            var repoName = repos[i].owner.login + "/" + repos[i].name;
        
            // create a container for each repo
            var repoEl = document.createElement("div");
            repoEl.classList = "list-item flex-row justify-space-between align-center";
        
            // create a span element to hold repository name
            var titleEl = document.createElement("span");
            titleEl.textContent = repoName;

            // create a status element using a span element to display which repositories need help at the moment
            var statusEl = document.createElement("span");  //Remember to display info inline, use the <span> element
            statusEl.classList = "flex-row align-center";

            /*
            We use an if statement to check how many issues the repository has. If the number is greater than zero, then 
            we'll display the number of issues and add a red X icon next to it. If there are no issues, we'll display a blue 
            check mark instead.  The font icons used here come from a service called Font Awesome. They offer a large selection 
            of free font icons, including icons for social networks, like the GitHub logo at the top of the page!

            */
            if (repos[i].open_issues_count > 0) {
                statusEl.innerHTML =
                    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
            } else {
                statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            }

        
            // append repo name to container
            repoEl.appendChild(titleEl);

            // append icon to container
            repoEl.appendChild(statusEl);
        
            // append container to the dom
            repoContainerEl.appendChild(repoEl);
        }
    };

userFormEl.addEventListener("submit", formSubmitHandler);