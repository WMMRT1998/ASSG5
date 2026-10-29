import { Profiler, useState } from "react";

const tvUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/shows/SHOW_ID/cast";
showLookup("The Office");
let id = (id) => document.getElementById(id);
let results = document.getElementById("results");

function Searchform() {
    return <>
        <form id="input-form">

            TV Show: <input id="Show" name="Show" type="text" />

                <button id="submit-btn" onClick={searchShow}>Submit!</button>

        </form>
        <section id="results">​
        </section>



    </>
}

async function searchShow(event){

    event.preventDefault();
    //clearResults();


    let params = new FormData(id("input-form"));

    await showLookup(params.get("Show"));
}

async function getCast(showId) {
    const response = await fetch(castUrl.replace("SHOW_ID", showId));
    const cast = await response.json();
    /*
            Test to make sure this function does get class list for each show.
    
        for (let member of cast) {
            console.log(member.person.name);
            }
            
    */
    return cast;
}


function clearResults() {
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

async function showLookup(input) {

    const response = await fetch(tvUrl + encodeURIComponent(input));

    const shows = await response.json();


    //This is a check to see if the search returned any results. If not, it will display a message
    if (shows.length === 0) {
        let noResults = document.createElement("p");
        noResults.textContent = "No results found.";
        results.appendChild(noResults);
        return;
    }

    console.log(shows);

    for (let show of shows) {

        createShowCard(show.show);

    }
}

async function createShowCard(show) {

    let castList = document.createElement("ul");
    let cast = await getCast(show.id);

    //Only show first 5 cast members, or all cast if there are less than 5.
    for (let i = 0; i < 5 && i < cast.length; i++) {
        castList.appendChild(document.createElement("li")).textContent = cast[i].person.name;
    }

    card = document.createElement("div");
    card.classList.add("show-card");

    let ShowName = document.createElement("h4");

    let showDetails = document.createElement("ul");

    //This is the details i want for each show and child of the showDetails 


    //My solution to the problem of the labels causing clearNoResults to not work was to create separate elements for li and values
    let showGenresLbl = document.createElement("li");
    let showPremiereLbl = document.createElement("li");
    let showRatingLbl = document.createElement("li");
    let showEndedLbl = document.createElement("li");

    let showSummary = document.createElement("li");
    let showGenres = document.createElement("p");
    let showPremiere = document.createElement("p");
    let showRating = document.createElement("p");
    let showEnded = document.createElement("p");


    let showURL = document.createElement("a");
    showURL.textContent = "More Info on TVMaze"
    showURL.href = show.url;



    ShowName.textContent = show.name;
    showSummary.textContent = show.summary;

    showSummary.textContent = showSummary.textContent.replace(/<[^>]*>?/gm, '');

    /*
    The label's here were causing clearNoResults to not work, so I removed them
    replaced with new solution of creating separate elements for li and values
    showGenres.textContent = "Genres: " + show.genres.join(", ");
    showPremiere.textContent = "Premiered: " + show.premiered;
    showRating.textContent = "Rating: " + show.rating.average;
    showEnded.textContent = "Ended: " + show.ended;

    */
    showGenres.textContent = show.genres.join(", ");
    showPremiere.textContent = show.premiered;
    showRating.textContent = show.rating.average;
    showEnded.textContent = show.ended;

    //I got it to work by removing label


    clearNoResults(showSummary);
    clearNoResults(showGenres);
    clearNoResults(showPremiere);
    clearNoResults(showRating);
    clearNoResults(showEnded);

    //Now, while labels, show up regardless, there is no null value represented



    showGenresLbl.textContent = "Genres: " + showGenres.textContent;
    showPremiereLbl.textContent = "Premiered: " + showPremiere.textContent;
    showRatingLbl.textContent = "Rating: " + showRating.textContent;
    showEndedLbl.textContent = "Ended: " + showEnded.textContent;



    card.appendChild(ShowName);
    showDetails.appendChild(showSummary);
    /*
    showDetails.appendChild(showGenresLbl);
    showDetails.appendChild(showPremiereLbl);
    showDetails.appendChild(showEndedLbl);
    showDetails.appendChild(showRatingLbl);
    */
    showDetails.appendChild(castList);
    showDetails.appendChild(showURL);


    //A new solution so labels are only added if the value is not empty
    addLabels(showDetails, showGenres, showGenresLbl);
    addLabels(showDetails, showPremiere, showPremiereLbl);
    addLabels(showDetails, showRating, showRatingLbl);
    addLabels(showDetails, showEnded, showEndedLbl);


    card.appendChild(showDetails);
    console.log(show.name);

    results.appendChild(card);
}

async function clearNoResults(input) {
    await new Promise(resolve => setTimeout(resolve, 100));
    let value = input.textContent.trim();
    if (
        value === '' ||
        value === 'null' ||
        value === 'undefined'
    ) {
        input.remove();
    }
}


//I was gonna use if statements, but I figured a function that did it would be better
async function addLabels(parent, input, label) {
    if (input.textContent.trim() !== '' && input.textContent.trim() !== 'null' && input.textContent.trim() !== 'undefined') {
        parent.appendChild(label);
    }

}

export default Searchform;