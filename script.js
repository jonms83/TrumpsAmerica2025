// URL of the CSV file
const csvUrl = "https://raw.githubusercontent.com/jonms83/TrumpsAmerica2025/refs/heads/main/TrumpsAmerica2025.csv";

// Fetch and parse the CSV data
fetch(csvUrl)
    .then(response => response.text()) // Get the CSV text
    .then(text => {
        const data = parseCSV(text); // Parse the CSV
        displayDataInTable(data); // Display the parsed data in a table
    })
    .catch(error => {
        console.error("Error fetching or parsing the CSV file:", error);
    });

function parseCSV(text) {
    const rows = text.split('\n'); // Split into rows
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].split(','); // Split into columns
        if (columns.length === 7) { // Ensure there are exactly 7 columns
            data.push(columns);
        }
    }

    return data;
}

function displayDataInTable(data) {
    const table = document.createElement('table'); // Create a table element
    table.border = '1'; // Add a border for better visibility

    // Use the first row as table headers
    const headerRow = document.createElement('tr');
    data[0].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header; // Use the header from the CSV
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Add the remaining rows as table data
    for (let i = 1; i < data.length; i++) {
        const tr = document.createElement('tr'); // Create a row
        data[i].forEach(column => {
            const td = document.createElement('td'); // Create a cell
            td.textContent = column; // Add cell text
            tr.appendChild(td);
        });
        table.appendChild(tr); // Add the row to the table
    }

    // Append the table to the output div
    const output = document.getElementById('output');
    output.appendChild(table);
}