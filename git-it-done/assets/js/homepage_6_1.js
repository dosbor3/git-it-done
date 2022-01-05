/*
6.1 In this lesson, we will build the initial HTML and homepage.js files
creating a variable to retrieve user repos from gitHub.  This will not display much yet, but 
will ensure that the js file is linked correctly.  Fittingly, this page searches for GitHub users 
and lists all of their repositories, tallying the open issues for each one.

Thankfully, GitHub provides a server-side API that allows apps like yours to request data as needed. 
You’ve already used web APIs, like the Storage API and Console API, which provided an interface to use 
browser features like localStorage and console.log() statements. Similarly, server-side APIs provide an 
interface to access data from a server.

What exactly is a server, though? A server is a piece of hardware set up to provide resources to 
other devices (often called clients). Clients can send requests to these servers in a number of 
ways. For example, a common HTTP (or HTTPS) request is to visit a URL in the browser 
(e.g., https://www.google.com). In turn, the server will send back the resource it defined for that 
URL, be it an HTML file, a PDF, an image, or data.

*/

var getUserRepos = function(user) { //<--- the function definition was updated to accept a user as a parameter
    //console.log("function was called");

    //practice
    //var response = "https://api.github.com/users/octocat";
    
    /*
    making a HTTP request to GitHub, GitHub responded with JSON data
    However, making the request only gets us halfway. We still need to 
    read the data that was returned in the response. You could try console 
    logging whatever the fetch() function returns.  Below is an HTTP request 
    to the GitHub API using fetch().  GitHub responded with JSON data.  Remember 
    that realationship: the request originated from the app, and the response came 
    from GitHub's server.

    We still need to read the data that was returned in the response.  Below is a 
    console log of the response variable, but the result is some weird Promise 
    object.  
    
    Promises are newer additions to JavaScript that act like more advanced 
    callback functions.  Promises are dicussed in greater detail down the road
    For now, note that Promises have a method called then(), and it is called when the
    Promise has been fulfilled

    */

    //var response = fetch("https://api.github.com/users/octocat/repos");
    //console.log(response);

    /*  The code has been updated below:    
    What you notice is that the second console.log("outside"); prints first, this is known as 
    asynchronous behavior.  Imagin if the GitHub API was running particularly slow and a response
    didn't come back for several seconds.  You wouldn't want the rest of your code to be blocked until then.  
    To avoid that , JavaScript will essentially set aside the fetch request and continue implementing the rest
    of your code, then come back and run the fetch callback when thre response is ready - thus working asynchronously
    (working at different times, not blocking the code underneath from running).  Event callbacks na dtimers are both 
    asynchronous

    This kind of asynchronous communication with a server is often referred to as AJAX, (Asynchronous JavaScript and XML).
    The XML in this term refers to an old-fashioned way of formatting data.  XML has been largely replaced by JSON, but the 
    name has persisted.

    To obtain the array of repos,  the response needs to be formatted.... 
    
    The response object in the fetch() logic has a method called json().  This method formats the response as JSON.
    Sometimes a resouce may return non-JSON data, and in those cases, a different method, like text(), would be used.

    The json() mthod returns another Promise, hence the extra then() method, whose callback function captures the actual
    data.  This nested then() syntax might confuse you at first, but the more API calls you make, the more comfortable you'll start 
    to feel with it.

    Lastly, to change the function to become dynamic (accept any username to search for in GitHub).  Change the function definition to
    accept any username.  Also, the url was hardcoded before, but now the url is stored in the apiUrl variable, and the user is concatenated
    into the value of the apiUrl variable. 
    
    */

    //format the github API url to accept any username
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        //console.log("inside", response);
        response.json().then(function(data) {
            console.log(data);
        });

    });
};
  
getUserRepos("microsoft");