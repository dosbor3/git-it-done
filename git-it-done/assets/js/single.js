/* Lesson 6.4
In this lesson, we'll resolve that problem by calling the GitHub API issues endpoint dynamically. Once the user has selected a repo from the list on the 
homepage, they'll be automatically directed to the single-repo.html page. There, they'll see a list of issues that correspond to the repo name selected, 
if issues for that repo exist.  In this lesson we will:

1.  Pass information from one page to another using query parameters
2.  Obtain data from a URL using browser-provided location objects
3.  Make the API call dynamic by using the query parameter to alter the request

For this lesson, we need to figure out how to communicate from one page to another

The steps for fetching API data:

1.  create a variable to store the API's url
2.  use the fetch method and then property to pull data
3.  Check for successful request, if successful, convert respone into JSON format
4.  Convert Fetched Data into DOM elements
5.  Append converted fetched data into a element
6.  Append <a> element to actual page


The steps for communicating from one page to another
1.  Create a link between pages
2.  Read and use data from the query parameter
3.  Handle errors
4.  Save progress with Git

/* **|**|**|**|**|**|**|**|**|**|**|**|**|****|**|**|**|**|**|   Query Parameters  |**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|

We use query parameters—strings appended to the end of URLs—to define actions, pass information, or specify content to the webpage or API endpoint. The ? 
symbol at the end of the URL identifies the parameters. Parameters are assigned values in a key=value format; the = assigns the value to the parameter/key. 
This information is passed to the website as part of the URL.

**|**|**|**|**|**|**|**|**|**|**|**|**|**|     Use the Split Method to Extract the Query Value   |**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**

Having a string conveniently allows us to use a variety of string methods to retrieve the data, namely the split() method. We can use string methods such as split() 
on all strings in JavaScript, not just query strings. The split() method splits a string into an array of substrings and returns the new array. The argument passed 
into the split() method will be used as the separator between those substrings.

                              var string = "Hello World";
                              string.split("o");
The preceding figure shows that the split results in an array with three elements: "Hell", " W", and "rld". Notice how each element of the array corresponds to the 
letters in the string before or after the letter "o". The "o" is the separator that defines where the substrings begin and end, but it isn't added to the array 
itself.

If an empty string ("") is used as the separator, the string is split between each character. Also, the split() method doesn't change the original string.

*/

//DOM reference to the issue container created in single-repo.html
var issueContainerEl = document.querySelector("#issues-container");

//DOM referecnt to the limit warning container created in single-repo.html
var limitWarningEl = document.querySelector("#limit-warning");

//to add the repo name to the header of the page, we need to create a DOM reference for the <span id="repo-name"> container
var repoNameEl = document.querySelector("#repo-name");

/*
we'll add to the getRepoName() function by using the location object and split() method to extract the repo name from the query string. Let's start by assigning 
the query string to a variable:                                                                                                                               */
var getRepoName = function() {
  var queryString = document.location.search; //<--- using the location object and search property to retrieve the query string that resembles 
                                              //?repo=microsoft/activities
  
  /*
  Once we have the queryString, which currently evaluates to ?repo=microsoft/activities, how do we break the string apart into the right substrings so that we can 
  isolate the piece we need (microsoft/activities)? In other words, which character do we need to pass into the split() method to use as the separator?      */
  var repoName = queryString.split("=")[1];
  getRepoIssues(repoName);
  repoNameEl.textContent = repoName;                                 
  
};

var getRepoIssues = function(repo) {
    
    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";  
        
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            displayIssues(data);            

            // check if api has paginated issues to inform the user that the repo has more than 30 issues
            displayWarning(repo);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
};

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
getRepoName();
getRepoIssues(repoName);


/* **|**|**|**|**|**|**|**|**|**|**|**|**|**   TOPICS LEARNED  **|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|**|



*/

