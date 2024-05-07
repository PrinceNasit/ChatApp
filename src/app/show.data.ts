import { Injectable } from '@angular/core';

Injectable({
    providedIn: 'root'
  })
interface XLSXData {
    [key: string]: any[];
}

export class Data {
    // Default path to the XLSX file
    defaultFilePath: string = './/quickTest.xlsx';
    
    // Function to fetch XLSX data from the server
    async fetchXLSXData(filePath: string): Promise<XLSXData> {
        try {
            const response = await fetch(`/load-xlsx?filePath=${encodeURIComponent(filePath)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch XLSX data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching XLSX data:', error);
            throw error;
        }
    }
    
    // Function to display XLSX data
    displayXLSX(data: XLSXData): void {
        const table = document.createElement('table');
    
        // Create table rows and cells
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const rowData = data[key];
                const tr = document.createElement('tr');
                for (const cellData of rowData) {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
        }
        const xlsxDataElement = document.getElementById('xlsxData');
        if (xlsxDataElement) {
            xlsxDataElement.appendChild(table);
        }
    }
    
    // Load XLSX data from the default path
    fetchDataFromDefaultPath(): void {
        this.fetchXLSXData(this.defaultFilePath)
            .then((data: XLSXData) => this.displayXLSX(data))
            .catch(error => console.error('Error loading XLSX data:', error));
    }
}

// Create an instance of the Data class
const dataInstance = new Data();
dataInstance.fetchDataFromDefaultPath();
