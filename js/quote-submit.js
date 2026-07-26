alert("QUOTE SUBMIT FILE LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    alert("FORM FOUND: " + (form !== null));

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event){

        alert("SUBMIT STOPPED");

        event.preventDefault();

    });

});
