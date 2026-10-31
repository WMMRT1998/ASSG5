import { useEffect, useState } from "react";
import ShowList from "./ShowList";

const tvUrl = "https://api.tvmaze.com/search/shows?q=";


function Searchform() {
    const [shows, setShows] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState(null);

    function searchShow(event) {
        event.preventDefault();
        const params = new FormData(event.currentTarget);
        const input = params.get("Show").trim();
        setError("");
        if (input) {
            setSearch({ query: input });
        }
    }

    useEffect(() => {
        if (!search) return;

        const controller = new AbortController();

        async function fetchShows() {
            try {
                const response = await fetch(tvUrl + encodeURIComponent(search.query), {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error("Search failed. Please try again.");
                }
                const data = await response.json();
                if (!controller.signal.aborted) {
                    setShows(data);
                }
            } catch {
                if (!controller.signal.aborted) {
                    setError("Unable to load shows. Please try again.");
                }
            }
        }

        fetchShows();
        return () => controller.abort();
    }, [search]);

    return <>
        <form id="input-form" onSubmit={searchShow}>

            TV Show: <input id="Show" name="Show" type="text" />

                <button id="submit-btn" type="submit">Submit!</button>

        </form>
        {error && <p role="alert">{error}</p>}
        <section id="results">
            <ShowList shows={shows} />
        </section>



    </>
}

export default Searchform;
