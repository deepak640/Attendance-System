import axios from 'axios'
import { useEffect, useState, useReducer } from 'react'
import { Button } from '@mui/material'
import './table.scss'
import { CSVLink } from "react-csv"
import { AiOutlineReload } from 'react-icons/ai'
import moment from "moment"
function Table() {
    const [ data, setdata ] = useState('')
    const [ isButtonClicked, setIsButtonClicked ] = useState(false);
    const [ reducervalue, forceUpdate ] = useReducer(x => x + 1, 0);
    const [ status, setstatus ] = useState('Stable')
    const [ Enroll_no, setUser ] = useState('')
    const [ reset_roll, setroll ] = useState('')
    const reset_course = localStorage.getItem("course")
    const Fac_ID = JSON.parse(localStorage.getItem("token")).userlogin.Fac_ID
    const courses = localStorage.getItem("course")
    const reset = async () => {
        try {
            setstatus("Stable")
            const res = await axios.post('https://attendance-s52k.onrender.com/reset', {
                Course: reset_course, Attendance: status
            })
            if (res.status === 200) { window.location = '/cards' }
        } catch (error) { console.log(error); }
    }
    const getstudent = async () => {
        try {
            const res = await axios.post('https://attendance-s52k.onrender.com/getstudent', {
                Fac_ID,
                courses,
            })
            const student = res.data
            setdata(Array.from(student.found))
        } catch (err) {
            console.log(err);
        }
    }
    //  ------------- status update system------------
    const reload = async () => {
        try {
            setstatus('Stable')
            const res = await axios.post('https://attendance-s52k.onrender.com/reset', {
                Enroll_no: reset_roll, Attendance: status
            })
            if (res.status === 200) { console.log('success'); }
        } catch (error) { console.log(error); }
    }
    const attend = async () => {
        const res = await axios.post('https://attendance-s52k.onrender.com/update', {
            Enroll_no, Attendance: status
        })
    }
    const header = [
        {
            label: "Enroll_no", key: "Enroll_no"
        },
        {
            label: "Name", key: "Sname"
        },
        {
            label: "Course", key: "Course"
        },
        {
            label: "Attendance", key: "Attendance"
        },
        {
            label: `marked on (${moment().format('dddd, MMMM Do YYYY')})`, key: `Date (${moment().format('MM/DD/YYYY')})`
        }
    ]
    const csvLink = {
        filename: `Attendance(${moment().format('MM-DD-YYYY')})`,
        headers: header,
        data: data
    }
    useEffect(() => {
        if (isButtonClicked) { attend() }
        getstudent()
    }, [ reducervalue ])
    return (<>
        {
            data.length > 0 ? <>
                <div className='attendance-tables overflow-auto'>
                    <table className="table table-striped  table-hover overflow-auto">
                        <thead>
                            <tr>
                                <th>Enroll_no</th>
                                <th>Course</th>
                                <th>SName</th>
                                <th>Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((data, index) =>
                                    <tr key={index} onMouseEnter={() => { setUser(data.Enroll_no); setroll(data.Enroll_no) }}>
                                        <td name={data.Enroll_no} value={data.Enroll_no}>{data.Enroll_no}</td>
                                        <td>{data.Course}</td>
                                        <td>{data.Sname}</td>
                                        <td>
                                            <div className='att-status' onMouseEnter={() => {
                                                if (data.Attendance !== 'Stable') {
                                                    document.getElementById(index).style.visibility = 'visible'
                                                }
                                            }} onMouseLeave={() => {
                                                if (data.Attendance !== 'Stable') {
                                                    document.getElementById(index).style.visibility = 'hidden'
                                                }
                                            }}>
                                                {
                                                    data.Attendance !== 'Stable' ? <><p style={{ 'display': 'inline-block' }}>{data.Attendance}</p><AiOutlineReload className='reload' onClick={() => { reload(); forceUpdate(); }} id={index} /></> :
                                                        <>
                                                            <Button onMouseOver={() => { setstatus('present') }} variant="outlined" onClick={() => { setIsButtonClicked(true); forceUpdate(); }}>Present</Button>
                                                            <Button onMouseMove={() => { setstatus('Absent') }} variant="outlined" onClick={() => { setIsButtonClicked(true); forceUpdate(); }} color='error'>Absent</Button>
                                                        </>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
                <div className='table-download'>
                    <Button className='table-submit' onClick={reset} variant="contained">Submit</Button>
                    <CSVLink {...csvLink}><Button className='table-print' variant='contained'>download</Button></CSVLink></div></>
                : <main className="flex-shrink-0">
                    <div className="mx-auto" style={{ width: '40%' }}>
                        <h1 className="mt-5">Data Not Found</h1>
                        <p className="lead">Thank you for using this website but sorry data not found the choosen faculty didn't alloted any course.</p>
                        <p><a href="/Contact">Click here</a>&nbsp;to contact for course allotment</p>
                    </div>
                </main>
        }
    </>);
}

export default Table;

