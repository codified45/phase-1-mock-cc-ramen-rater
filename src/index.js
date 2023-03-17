const currentRamensUrl = "http://localhost:3000/ramens";

document.addEventListener("DOMContentLoaded", function() {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetails = document.getElementById('ramen-detail');
    const newRamenForm = document.getElementById('new-ramen');
    newRamenForm.addEventListener('submit', submitNewRamen);
    const editFeatRamen = document.getElementById('edit-ramen');
    editFeatRamen.addEventListener('submit', editFeaturedRamen);

    displayRamensInMenu();
    initRamenDetailDisplay();    

    function displayRamensInMenu() {
        fetch(currentRamensUrl)
        .then(res => res.json())
        .then(obj => {
            for (const element of obj) {
                const span = document.createElement('span');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                btn.textContent = "Delete";
                btn.addEventListener('click', dltBtnHandler);
                img.src = element.image;
                img.id = element.id;
                img.addEventListener('click', displayRamenDetail);
                span.classList.add('menuImage');
                span.append(img, btn);
                ramenMenu.append(span);
            };
        });
    };

    function dltBtnHandler(e) {
        let id = e.target.previousSibling.id;

        let dltMsgFormat = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };

        let dltRamenUrl = currentRamensUrl + `/${id}`;
        fetch(dltRamenUrl, dltMsgFormat)
        .then(res => res.json())
        .then(obj => {
            e.target.parentNode.remove();
            initRamenDetailDisplay();
        });
    };

    function initRamenDetailDisplay() {
        const name = document.querySelector('h2.name');
        const restaurant = document.querySelector('h3.restaurant');
        const comment = document.getElementById('comment-display');
        const rating = document.getElementById('rating-display');
        const image = document.querySelector('img.detail-image');
        fetch(currentRamensUrl)
        .then(res => res.json())
        .then(arr => {
            console.log(arr[0]);
            image.src = arr[0].image;
            image.id = arr[0].id + 'detail';
            name.textContent = arr[0].name;
            restaurant.textContent = arr[0].restaurant;
            rating.textContent = arr[0].rating;
            comment.textContent = arr[0].comment;
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
        image.id = obj.id + 'detail';
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
    
    function editFeaturedRamen(e) {
        e.preventDefault();
        let form = e.target;

        let editRamen = {
            "rating": Number.parseInt(form.rating.value),
            "comment": form["new-comment"].value,
        };

        let patchMsgFormat = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editRamen),
        };

        let ftRamenImg = document.querySelector('#ramen-detail img');
        let ftRamenId = Number.parseInt(ftRamenImg.id);
        let editRamenUrl = currentRamensUrl + `/${ftRamenId}`;
        fetch(editRamenUrl, patchMsgFormat)
        .then(res => res.json())
        .then(obj => console.log(obj));
        form.reset();
    };

});