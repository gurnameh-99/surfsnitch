// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    const ctxLine = document.getElementById('lineChart').getContext('2d');

    // Pie Chart
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Website 1', 'Website 2', 'Website 3'],
            datasets: [{
                label: 'Website Usage',
                data: [10, 20, 30], // Example data
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' hours';
                        }
                    }
                }
            }
        }
    });

    // Line Chart
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [{
                label: 'Productivity',
                data: [1, 2, 1.5, 3, 2.5], // Example data
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76,175,80,0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' hours';
                        }
                    }
                }
            }
        }
    });
});
