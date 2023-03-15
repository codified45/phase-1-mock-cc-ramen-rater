const currentRamensUrl = "http://localhost:3000/ramens";


document.addEventListener("DOMContentLoaded", function() {
    const ramenMenu = document.getElementById('ramen-menu');

    displayRamensInMenu();

    function displayRamensInMenu() {
        fetch(currentRamensUrl)
        .then(res => res.json())
        .then(obj => {
            for (const element of obj) {
                const img = document.createElement('img');
                img.src = element.image;
                img.addEventListener('click', displayRamenDetail);
                ramenMenu.append(img);
            };
        });
    };

    function displayRamenDetail(e) {

    };

});