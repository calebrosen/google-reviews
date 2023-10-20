
function initMap() {
    const placeId = 'ChIJVWM38_Yu2YgRF2XCQyWVBiI'; // place ID - get @ https://developers.google.com/maps/documentation/places/web-service/place-id
    const apiKey = 'REDACTED'; // api key

    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);

    // Get reviews
    service.getDetails({
        placeId: placeId,
        fields: ['name', 'reviews'],
        key: apiKey,
        maxResults: 20
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) { // uses google places API
            const reviews = place.reviews;
            const reviewsContainer = document.getElementById('reviews-container');
            let totalRating = 0;
            
            // loop through reviews and pull only 4 & 5 star reviews
            reviews.forEach(review => {
                if (review.rating >= 4) { // to 3 if you want to pull 3-5 star reviews, etc
                    totalRating += review.rating;
                    let author_url = review.author_url;
                    let constructedReviewURL = author_url.substring(0, author_url.length - 7) + "place/" + placeId; // builds the clickable name for the review
                    const reviewElement = document.createElement('div');
                    reviewElement.classList.add('review');
                    reviewElement.innerHTML = `
                        <a href="${constructedReviewURL}" target="_blank">
                        <center><p style="font-size:20px">${review.author_name}</p></a></center>
                        <center><p>${review.text}</p></center>
                        <center><p style="color: #858585; font-size: 13px; padding-top:2px; padding-bottom:2px;">${review.relative_time_description}</p></center>
                        <center><p>${generateStars(review.rating)}</p></center>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                }
            });
           
            /*
            // get average rating
           const averageRating = totalRating / reviews.length;
           const totalStarsElement = document.getElementById('totalStars');
           totalStarsElement.textContent = `${averageRating.toFixed(2)}`;
           */

        } else {
            console.error('Error fetching place details:', status);
        }
    });
}

    
        
// put content in a responsive carousel
function loadSlickCarousel() {
    $('.reviews-container').slick({
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: true, 
        dots: false, 
        mobileFirst: false,        
        autoplay: false,
        autplaySpeed: 7000,
        speed: 850,
        prevArrow: '<button class="slick-prev" aria-label="Previous" style="position:absolute; top:50%; left: 1px;transform: translateY(-50%);"><svg xmlns="http://www.w3.org/2000/svg" height="1.45em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#2b6deb}</style><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" style="position:absolute; top:50%; right:1px;  transform: translateY(-50%);"><svg xmlns="http://www.w3.org/2000/svg" height="1.45em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#2b6deb}</style><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    mobileFirst: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                  //  adaptiveHeight: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    mobileFirst: true
                }
            }
        ]
    });
}


        function generateStars(rating) {
            let stars = '';
            for (let i = 0; i < rating; i++) {
                stars += '<svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 576 512" style="fill: #ffd700;"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg>'; 
            }
            return stars;
        }



        window.onload = function() {
            loadSlickCarousel();
        };

