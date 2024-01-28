import React from 'react'

export const IndividualData = ({ individualExcelData }) => {
    return (
        <>
            <td>{individualExcelData.Enroll_no}</td>
            <td>{individualExcelData.Name}</td>
            <td>{individualExcelData.Course}</td>
            <td>{individualExcelData.Attendance}</td>
        </>
    )
}