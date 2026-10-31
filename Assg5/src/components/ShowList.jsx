import "./ShowList.css";
function ShowList({ shows }) {
    return (
        <ul id="Cards">
            {shows.map(({ show }) => (
                <li class="card" key={show.id}>
                    <h3>{show.name}</h3>
                    <p>{removeHTML(show.summary)}</p>
                    <ul>
                        <li>Genre: {show.genres}</li>
                        <li>Primiered: {show.premiered}</li>
                        <li>Ended: {show.ended}</li>
                        <li>Rating: {show.rating.average}</li>

                    </ul>
                </li>
            ))}
        </ul>
    );
}

function removeHTML(input) {
    const summary = new DOMParser().parseFromString(input ?? "", "text/html");
    return summary.body.textContent ?? "";
}

export default ShowList;
