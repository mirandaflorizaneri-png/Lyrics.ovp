const searchBtn = document.getElementById('searchBtn');
const artistInput = document.getElementById('artist');
const titleInput = document.getElementById('title');
const lyricsContainer = document.getElementById('lyrics');
const songTitle = document.getElementById('songTitle');

searchBtn.addEventListener('click', () => {
    const artist = artistInput.value.trim();
    const title = titleInput.value.trim();

    if (!artist || !title) {
        alert('Please enter both artist and song title');
        return;
    }

    lyricsContainer.textContent = "Loading...";
    songTitle.textContent = "";

    fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
        .then(res => res.json())
        .then(data => {
            if (data.lyrics) {
                songTitle.textContent = `${title} - ${artist}`;
                lyricsContainer.textContent = data.lyrics;
            } else {
                lyricsContainer.textContent = "Lyrics not found!";
            }
        })
        .catch(err => {
            lyricsContainer.textContent = "Error fetching lyrics!";
            console.error(err);
        });
});
