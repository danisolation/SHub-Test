const axios = require('axios');
const XLSX = require('xlsx');

async function filterSales() {
    try {
        const url = 'https://go.microsoft.com/fwlink/?LinkID=521962';
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const workbook = XLSX.read(response.data, { type: 'buffer' });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

       
        for (const data in jsonData) {
            jsonData[data]['  Sales '] = Number(jsonData[data]['  Sales '].replace(/[$,]/g, '')) 
        }

        const filteredData = jsonData.filter(row => row['  Sales '] > 50000);

        for (const data in filteredData) {
            filteredData[data]['  Sales '] = '$' + String(filteredData[data]['  Sales ']) 
        }

        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Filtered Sales');
        XLSX.writeFile(newWorkbook, 'filtered_sales.xlsx');

        console.log('File has been written with filtered data.');
    } catch (error) {
        
        console.error(error);
    }
}

filterSales();
