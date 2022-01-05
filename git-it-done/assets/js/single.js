/* Lesson 6.3
In this lesson, we will provide the functionality of the user being able to click on a single repo in the list of repos, 
and be redirected to a new page that will list all of the issues associated with that repo.  In this lesson we will:

1.  Define request and response headers
2.  Use additinal GitHub API endpoints 

For this lesson, we created a new js file named single.js and linked it to the single-repo.html file that was given 

*/

/*6.3.4 Fetch the API data, start by creating a new function named getRepoIssues() that will take in a repo name as a parameter
The API endpoint we've been using (/users/<user>/repos) doesn't provide enough information for us to display the individual 
issues for a single repository.  The steps for fetching API data:

1.  create a variable to store the API's url
2.  use the fetch method and then property to pull data
3.  Check for successful request, if successful, convert respone into JSON format
4.  Convert Fetched Data into DOM elements
5.  Append converted fetched data into a element
6.  Append <a> element to actual page

*/

var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    /*
    The documentation might not make this apparent, but we also have the option to append ?direction=asc to the end of the query 
    URL to specify the sort order. By default, GitHub returns request results in descending order by their created date, meaning 
    that we see newer issues first. The ?direction=asc option reverses order to return older issues first.   Using the endpoint 
    listed in the GitHub documentation for retrieving issues, we can format the URL as follows:

    */
    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";   

    //Remember that fetch() is asynchronous. We'll have to use its Promise-based syntax to actually access the data contained in 
    //the response.  We had to update the fetch() request to receive and handle the server's response:
    //We are building out a basic HTTP reques to hit the issues endpoint.  REMEMBER fetch() is asynchronous, so we'll have to use
    //its Promise based syntax to actually access the data contained in the response b/c waiting for a response
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            displayIssues(data);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
};

//creating new function that accepts issues as a parameter that will turn the GitHub issue data into DOM elements
//If the response is successful in the fetch(), then call this method
var displayIssues = function(issues) {
    //check for open issues
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    
    //create an a tag for each of the issues listed
    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } 
        else {
            typeEl.textContent = "(Issue)";
        }

// append to container
issueEl.appendChild(typeEl);
issueContainerEl.appendChild(issueEl);
    }
};

getRepoIssues("facebook/react");
