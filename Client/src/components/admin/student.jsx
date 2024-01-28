import { useState } from 'react'
import { Data } from './data'
import * as XLSX from 'xlsx'
import { useEffect, useReducer } from "react";
import axios from "axios";
import { Button } from "@mui/material";
const Student = () => {
    const [ excelFile, setExcelFile ] = useState(null);
    const [ excelFileError, setExcelFileError ] = useState(null);
    const [ getdata, setgetdata ] = useState([])
    const [ reducervalue, forceUpdate ] = useReducer(x => x + 1, 0);
    const [ student, setstudent ] = useState()
    const [ excelData, setExcelData ] = useState(null);
    const [ data, setdata ] = useState()
    const fileType = [ 'application/vnd.ms-excel' ];
    const handleFile = (e) => {
        let selectedFile = e.target.files[ 0 ];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                }
            }
            else {
                setExcelFileError('Please select only excel file type XLS');
                setExcelFile(null);
            }
        }
        else {
            console.log('plz select your file');
        }
    }
    const submit = () => {
        try {
            const { Fac_ID, Sname, Course, Enroll_no, Attendance } = data
            console.log(data);
            for (let index = 0; index < data.length; index++) {
                const res = axios.post('https://attendance-s52k.onrender.com/addstudent', {
                    Fac_ID: data[ index ].Fac_ID, Sname: data[ index ].Name, Course: data[ index ].Course, Enroll_no: data[ index ].Enroll_no, Attendance: data[ index ].Attendance
                })
            }
            alert("all inserted")
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[ 0 ];
            const worksheet = workbook.Sheets[ worksheetName ];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data);
            setdata(data)
        }
        else {
            setExcelData(null);
        }
    }
    const getstudent = async () => {
        const res = await axios.get('https://attendance-s52k.onrender.com/student-data', {
            headers: {
                'If-None-Match': 'ETag-value-from-previous-request'
            }
        })
        // console.log(res.data);
        setgetdata(res.data)
    }
    const del_student = () => {
        const res = axios.post('https://attendance-s52k.onrender.com/delete', {
            Enroll_no: student
        })
    }
    useEffect(() => {
        getstudent()
    }, [ reducervalue ])
    return (
        <>
            <div className="container mt-5">
                <div className='form'>
                    <form className='form-group import-form' autoComplete="off"
                        onSubmit={handleSubmit}>
                        <label><h5>Upload Excel file</h5></label>
                        <br></br>
                        <input type='file' className='form-control'
                            onChange={handleFile} required></input>
                        {excelFileError && <div className='text-danger'
                            style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
                        <button type='submit' className='btn btn-success'
                            style={{ marginTop: 5 + 'px' }}>Submit</button>
                        <a className='get-student btn btn-primary' onClick={() => {
                            document.getElementById('student-popup').style.display = 'flex'
                            getstudent();
                        }}>GET DATA</a>
                    </form>
                </div>
                <hr></hr>
                <h5>View Excel file</h5>
                {excelData === null && <>No file selected</>}
                <div className='viewer mx-auto'>
                    {excelData !== null && (<>
                        <div className='table-responsive'>
                            <table className='table table-hover border-black' style={{ color: "white", fontWeight: "100" }}>
                                <thead>
                                    <tr>
                                        <th scope='col'>Enroll_no</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Course</th>
                                        <th scope='col'>Attendance</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    <Data excelData={excelData} />
                                </tbody>
                            </table>
                        </div>
                        <Button onClick={submit} variant='contained'>UPLOAD</Button></>
                    )}
                </div>
            </div>
            <div className="view-popup" id='student-popup'>
                <i onClick={() => {
                    document.getElementById('student-popup').style.display = 'none'
                }} className="fa-solid fa-xmark close"></i>
                <div className="view-content table-wrapper">
                    <table className="table table-striped table-hover" style={{ 'width': '100%' }}>
                        <thead>
                            <tr>
                                <th>Enroll_no</th>
                                <th>Student</th>
                                <th>Course</th>
                                <th>Attendance</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                getdata.map((getdata, index) =>
                                    <tr onMouseOver={() => { setstudent(getdata.Enroll_no); }} style={{ 'textAlign': 'center' }} key={index}>
                                        <td>{getdata.Enroll_no}</td>
                                        <td>{getdata.Sname}</td>
                                        <td>{getdata.Course}</td>
                                        <td>{getdata.Attendance}</td>
                                        <td><Button onClick={() => { del_student(); forceUpdate(); }} variant="outlined" color="error">DELETE</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Student;