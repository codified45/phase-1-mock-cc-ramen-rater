const currentRamensUrl = "http://localhost:3000/ramens";


document.addEventListener("DOMContentLoaded", function() {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetails = document.getElementById('ramen-detail');
    const newRamenForm = document.getElementById('new-ramen');
    newRamenForm.addEventListener('submit',submitNewRamen);

    displayRamensInMenu();

    function displayRamensInMenu() {
        fetch(currentRamensUrl)
        .then(res => res.json())
        .then(obj => {
            for (const element of obj) {
                const img = document.createElement('img');
                img.src = element.image;
                img.id = element.id;
                img.addEventListener('click', displayRamenDetail);
                ramenMenu.append(img);
            };
        });
    };

    function displayRamenDetail(e) {
        const chosenRamenUrl = currentRamensUrl + `/${e.target.id}`;
        const name = document.querySelector('h2.name');
        const restaurant = document.querySelector('h3.restaurant');
        const comment = document.getElementById('comment-display');
        const rating = document.getElementById('rating-display');
        const image = document.querySelector('img.detail-image');
        fetch(chosenRamenUrl)
        .then(res => res.json())
        .then(obj => {
        image.src = obj.image;
        name.textContent = obj.name;
        restaurant.textContent = obj.restaurant;
        rating.textContent = obj.rating;
        comment.textContent = obj.comment;
        });
    };

    

    function submitNewRamen(e) {
        e.preventDefault();
        let form = e.target;

        let newRamen = {
            "name": form.name.value,
            "restaurant": form.restaurant.value,
            "image": form.image.value,
            "rating": Number.parseInt(form.rating.value),
            "comment": form["new-comment"].value,
        };

        console.log(newRamen);

        let postMsgFormat = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRamen),
        };

        fetch(currentRamensUrl, postMsgFormat)
        .then(res => res.json())
        .then(obj => console.log(obj));
    };

});