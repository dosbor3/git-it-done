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

//DOM reference to the issue container created in single-repo.html
var issueContainerEl = document.querySelector("#issues-container");

//DOM referecnt to the limit warning container created in single-repo.html
var limitWarningEl = document.querySelector("#limit-warning");

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
            

             // **|**|**|**|**|**|**|**|**|**|**|**|**|**   HTTP HEADERS  **|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|
            /*
            HTTP headers allow the client and the server to pass additional information with an HTTP request or response. This 
            often includes information like whether or not to cache (locally store) data and, if so, for how long. This data goes 
            in the headers because it's often small in file size and not directly pertinent to the content in the body of a request 
            or response.  For example, the very common Content-Type header specifies the format of the requested resource. The 
            GitHub API responses always include a Content-Type value of application/json to signify that the response is formatted 
            as JSON.  You can view the headers on a request or response in DevTools by clicking on the request in the Network tab.
            */

            // check if api has paginated issues to inform the user that the repo has more than 30 issues
            displayWarning(repo);
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

//creating a new displayWarning() function with a repo parameter which will inform the user if there are more than 30 issues
//for a given repo
var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To See More than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");


// **|**|**|**|**|**|**|**|**|**|**|**|**|**   TOPICS LEARNED  **|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|
/*
Learned that request and response headers contain additional information about the request, separate from the data 
itself—like GitHub's Link header that lets you know there are more pages of results to request.

Leveraged a new GitHub API endpoint to request more specific data, using an optional ? string to change how results 
are sorted.

*/

