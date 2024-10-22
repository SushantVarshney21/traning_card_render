document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const cardList = document.getElementById("card-list");
    let cardsData = []
    let load = true;

    if (load) {
        cardList.innerHTML = "<h2>Loading...</h2>";
    }

    const fetchcards = async () => {
        try {
            const res = await fetch("https://pbivizedit.com/api/visuals");
            const cards = await res.json();
            cardsData = cards.items
            if (cardsData.length > 0) {
                load = false;
            }
            console.log(cardsData)
            renderCard(cardsData)
        } catch (error) {
            console.log(error)
        }
    };



    const renderCard = (cardsData) => {
        cardList.innerHTML = "";
        if (cardsData.length === 0) {
            cardList.innerHTML = "<h2>Data Not Found</h2>";
        }
        else {

            cardsData.forEach(card => {
                const cardItem = document.createElement('div');
                cardItem.classList.add('card');

                const cardImage = document.createElement('img');
                cardImage.src = card.imagePath;
                cardItem.appendChild(cardImage);

                const cardLine = document.createElement('div')
                cardLine.classList.add('line')
                cardItem.appendChild(cardLine)

                const cardName = document.createElement('h4');
                cardName.textContent = card.name;
                cardItem.appendChild(cardName);

                cardList.appendChild(cardItem);
            });
        }
    }


    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value;
        const regex = new RegExp(searchText, 'i');
        console.log(regex)
        const filteredCards = cardsData.filter(card =>
            regex.test(card.id)
        );

        console.log(filteredCards)

        renderCard(filteredCards);
    });




    fetchcards()
})
