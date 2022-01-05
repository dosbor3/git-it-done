
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

    fetch(apiUrl).then(function(response) {
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

    
    var displayRepos = function(repos, searchTerm){
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