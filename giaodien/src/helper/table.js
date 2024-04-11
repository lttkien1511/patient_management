import React from 'react';
import Table from 'react-bootstrap/Table';


export const GenericTable = ({ headers, data, onRowClick}) => {
    const handleRowClick = (rowData) => {
        if (onRowClick) {
            onRowClick(rowData);
        }
    }

    return (
        <div className='table'>
            <Table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} colSpan={header.colSpan || 1}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} onClick={onRowClick ? () => handleRowClick(row) : undefined}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}