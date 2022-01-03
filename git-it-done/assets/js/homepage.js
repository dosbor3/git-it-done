/*
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

var getUserRepos = function() {
    console.log("function was called");

    //practice
    var response = "https://api.github.com/users/octocat";
    fetch("https://api.github.com/users/octocat/repos");
};
  
getUserRepos();