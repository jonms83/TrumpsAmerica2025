// URL of the CSV file
const csvUrl = "https://raw.githubusercontent.com/jonms83/TrumpsAmerica2025/refs/heads/main/TrumpsAmerica2025.csv";

// Fetch and parse the CSV data using PapaParse
fetch(csvUrl)
    .then(response => response.text()) // Get the CSV text
    .then(text => {
        // Parse the CSV text using PapaParse
        Papa.parse(text, {
            header: true, // Use the first row as headers
            dynamicTyping: true, // Automatically convert numbers and booleans
            skipEmptyLines: true, // Skip empty lines
            complete: function (results) {
                displayDataInTable(results.data); // Display the parsed data in a table
                makeColumnsResizable(); // Enable column resizing
            },
            error: function (error) {
                console.error("Error parsing CSV:", error);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the CSV file:", error);
    });

function displayDataInTable(data) {
    const table = document.createElement('table'); // Create a table element
    table.className = 'csv-table'; // Add a class for styling

    // Create table headers from the keys of the first row
    if (data.length > 0) {
        const headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach(header => {
            const th = document.createElement('th');
            th.textContent = header; // Use the header from the CSV
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
    }

    // Add table rows
    data.forEach((row, index) => {
        const tr = document.createElement('tr'); // Create a row
        tr.className = index % 2 === 0 ? 'even-row' : 'odd-row'; // Zebra striping

        Object.values(row).forEach(column => {
            const td = document.createElement('td'); // Create a cell

            // Check if the column contains a URL
            if (typeof column === 'string' && (column.startsWith('http://') || column.startsWith('https://'))) {
                const link = document.createElement('a');
                link.href = column; // Set the URL
                link.textContent = column; // Display the URL text
                link.target = '_blank'; // Open in a new window
                td.appendChild(link); // Add the link to the cell
            } else {
                td.textContent = column; // Add cell text
            }

            tr.appendChild(td);
        });
        table.appendChild(tr); // Add the row to the table
    });

    // Append the table to the output div
    const output = document.getElementById('output');
    output.appendChild(table);
}

function makeColumnsResizable() {
    const table = document.querySelector('.csv-table');
    const headers = table.querySelectorAll('th');

    headers.forEach((header, index) => {
        let isResizing = false;
        let startX;
        let startWidth;

        // Create a resizer element
        const resizer = document.createElement('div');
        resizer.className = 'resizer';
        header.appendChild(resizer);

        // Add event listeners for resizing
        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = header.offsetWidth;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (isResizing) {
                const newWidth = startWidth + (e.clientX - startX);
                header.style.width = `${newWidth}px`;
                table.style.tableLayout = 'auto'; // Allow columns to resize
            }
        }

        function onMouseUp() {
            isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });
}