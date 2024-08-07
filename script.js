$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionsColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        navigation: true,
        navigationPosition: "right",
        navigationTooltips: ["Home", "Stats", "Inventory"],
        showActiveTooltips: true,
        anchors: ["Home", "Stats", "Inventory"],
        scrollOverflow: true 
    });

    
    $('#BookInventoryTable').DataTable({
        "pageLength": 5, 
        "lengthMenu": [5, 10, 15, 20],  
        "pagingType": "full_numbers" 
    });
   
    
    $(document).ready(function () {
        var genre = ['Biography', 'History', 'Fiction', 'Self Help', 'Humor', 'Others'];
        var caseCounts = [9, 4, 1, 2, 1, 3];
        
        var genreColors = [
            'rgba(255, 99, 132, 1)', 
            'rgba(54, 162, 235, 1)', 
            'rgba(255, 206, 86, 1)', 
            'rgba(75, 192, 192, 1)', 
            'rgba(153, 102, 255, 1)', 
            'rgba(255, 159, 64, 1)',
            
        ];
        
        var ctx = document.getElementById('booksChart').getContext('2d');
        var booksChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: genre,
                datasets: [{
                    label: 'Literary genre',
                    backgroundColor: genreColors,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: caseCounts
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    
        anime({
            targets: booksChart, 
            easing: 'easeInOutQuad', 
            delay: anime.stagger(100), 
            duration:2000, 
            update: function() {
                booksChart.update();
            }
        });
    });
    

    function toggleReservation(button) {
        if ($(button).hasClass('btn-primary')) {
            $(button).removeClass('btn-primary').addClass('btn-secondary');
            $(button).text('Reserved');
        } else {
            $(button).removeClass('btn-secondary').addClass('btn-primary');
            $(button).text('Reserve');
        }
    }

    $('.card .btn').click(function(event) {
        event.stopPropagation();
        toggleReservation(this);
    });

    $('.card').click(function(event) {
        var title = $(this).data('title');
        var author = $(this).data('author');
        var description = $(this).data('description');
            $('#bookModalLabel').text(title); 
        $('#bookDescription').text(description); 
        $('#bookAuthor').text(author);

        $('#bookModal').modal('show');
    });
    function searchBooks() {

        var searchTerm = $('#searchInput').val().toLowerCase().trim();

   
        $('.card').each(function() {
            var title = $(this).data('title').toLowerCase();
            if (title.includes(searchTerm)) {
                $(this).show(); 
            } else {
                $(this).hide(); 
            }
        });
        if (resultsFound) {
            $('#noResultsMessage').hide(); 
        } else {
            $('#noResultsMessage').show();
        }
    }

    $('#searchButton').click(function() {
        searchBooks(); 
    });

    $('#searchInput').keypress(function(event) {
        if (event.key === 'Enter') {
            searchBooks(); 
        }
    });
 
    
});
