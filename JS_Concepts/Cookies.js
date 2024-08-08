// Creating Cookies

// To create a cookie, you assign a string value to document.cookie. The format is:

document.cookie = "name=value; expires=expiration_date; path=path; domain=domain; secure; samesite=samesite";


/*
name=value: The name and value of the cookie.
expires: The expiration date in GMT format. If not set, the cookie will expire at the end of the session.
path: The path within the domain where the cookie is valid. Default is the current path.
domain: The domain where the cookie is valid. Default is the current domain.
secure: If set, the cookie will only be sent over secure (HTTPS) connections.
samesite: Controls whether the cookie is sent with cross-site requests. Options are Strict, Lax, or None.


*/

// Create a cookie that expires in 7 days

var date = new Date();
date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
var expires = "expires=" + date.toUTCString();
document.cookie = "username=JSMount; " + expires + "; path=/";

//! Reading Cookies

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Usage
var username = getCookie("username");
console.log(username); // Outputs: JSMount


//! Deleting Cookies

// To delete a cookie, you set its expiration date to a past date.

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Usage
deleteCookie("username");


