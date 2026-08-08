(function() {
    const stars = document.querySelectorAll('#starRating .fa-star');
    const ratingDisplay = document.getElementById('ratingDisplay');
    const productSelect = document.getElementById('productSelect');
    const reviewText = document.getElementById('reviewText');
    const submitBtn = document.getElementById('submitReview');
    const reviewsList = document.getElementById('reviewsList');

    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            selectedRating = value;
            updateStars(value);
            ratingDisplay.textContent = value + ' / 5';
        });
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.dataset.value);
            updateStars(value, true);
        });
        star.addEventListener('mouseleave', function() {
            updateStars(selectedRating);
        });
    });

    function updateStars(rating, hover = false) {
        stars.forEach(star => {
            const value = parseInt(star.dataset.value);
            if (value <= rating) {
                star.classList.add('active');
                star.classList.remove('inactive');
            } else {
                star.classList.remove('active');
                star.classList.add('inactive');
            }
        });
    }

    updateStars(0);

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('sunTeaReviews')) || [];
        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to share!</p>';
            return;
        }
        let html = '';
        reviews.forEach((review, index) => {
            const starsHtml = getStarsHtml(review.rating);
            html += `
                <div class="review-item">
                    <div class="review-header">
                        <strong>${review.product}</strong>
                        <span class="review-rating">${starsHtml}</span>
                    </div>
                    <p class="review-text">${review.comment}</p>
                    <span class="review-date">${new Date(review.timestamp).toLocaleString()}</span>
                </div>
            `;
        });
        reviewsList.innerHTML = html;
    }

    function getStarsHtml(rating) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            html += `<i class="fas fa-star ${i <= rating ? 'active' : 'inactive'}"></i>`;
        }
        return html;
    }

    function submitReview() {
        if (selectedRating === 0) {
            alert('Please select a rating.');
            return;
        }
        const comment = reviewText.value.trim();
        if (comment === '') {
            alert('Please write your review.');
            return;
        }
        const product = productSelect.value;

        const newReview = {
            product: product,
            rating: selectedRating,
            comment: comment,
            timestamp: Date.now()
        };

        const reviews = JSON.parse(localStorage.getItem('sunTeaReviews')) || [];
        reviews.unshift(newReview);
        localStorage.setItem('sunTeaReviews', JSON.stringify(reviews));

        reviewText.value = '';
        selectedRating = 0;
        updateStars(0);
        ratingDisplay.textContent = '0 / 5';
        productSelect.selectedIndex = 0;

        loadReviews();
    }

    submitBtn.addEventListener('click', submitReview);
    loadReviews();
})();
