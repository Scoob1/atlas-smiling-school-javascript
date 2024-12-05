$(document).ready(function () {
  // URL for the quotes API
  const quotesUrl = "https://smileschool-api.hbtn.info/quotes";

  // Fetch quotes from API
  $.ajax({
      url: quotesUrl,
      method: "GET",
      beforeSend: function () {
          // Show loader while fetching data
          $('#quotes-section').html('<div class="loader"></div>');
      },
      success: function (data) {
          // Clear loader
          $('#quotes-section').html('');

          // Create carousel container
          const carousel = $('<div class="slick-carousel"></div>');

          // Populate carousel with quotes
          data.forEach(quote => {
              const quoteHtml = `
                  <div class="quote-card text-center">
                      <img src="${quote.pic_url}" alt="${quote.name}" class="rounded-circle mb-3" width="100" height="100">
                      <blockquote class="blockquote">
                          <p class="mb-0">${quote.text}</p>
                      </blockquote>
                      <footer class="blockquote-footer">
                          ${quote.name}<br>
                          <small>${quote.title}</small>
                      </footer>
                  </div>
              `;
              carousel.append(quoteHtml);
          });

          // Append carousel to quotes section
          $('#quotes-section').append(carousel);

          // Initialize Slick Carousel
          carousel.slick({
              dots: true,
              arrows: true,
              slidesToShow: 1,
              slidesToScroll: 1
          });
      },
      error: function () {
          $('#quotes-section').html('<p class="text-danger text-center">Failed to load quotes. Please try again later.</p>');
      }
  });
});
