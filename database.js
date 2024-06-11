document.getElementById('salesForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const formData = {
        date: document.getElementById('date').value,
        rdate: document.getElementById('real_date').value,
        msales: parseInt(document.getElementById('morning_sales').value) || 0,
        nsales: parseInt(document.getElementById('night_sales').value) || 0,
        tsales: parseInt(document.getElementById('total_sales').value) || 0,
        target: parseInt(document.getElementById('target_sales').value) || 0,
        hit: document.getElementById('hit').value
    };

    fetch('http://localhost:3000/submit-form-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => {
        if (response.ok) {
            showModal('Data submitted successfully');
        } else {
            showModal('Failed to submit data');
        }
    }).catch(error => {
        console.error('Error:', error);
        showModal('An error occurred');
    });
});

// Automatically calculate total sales
document.getElementById('morning_sales').addEventListener('input', calculateTotalSales);
document.getElementById('night_sales').addEventListener('input', calculateTotalSales);

function calculateTotalSales() {
    const morningSales = parseInt(document.getElementById('morning_sales').value) || 0;
    const nightSales = parseInt(document.getElementById('night_sales').value) || 0;
    const totalSales = morningSales + nightSales;
    document.getElementById('total_sales').value = totalSales;
}

// Modal functionality
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const span = document.getElementsByClassName('close')[0];

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
