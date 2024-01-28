import React, { useState, useReducer } from 'react';
import axios from 'axios'
import { Button } from '@mui/material';
import { useEffect } from 'react';
const Course = () => {
    const [ data, setdata ] = useState({ Fac_ID: "", courses: "" });
    const [ course, setcourse ] = useState()
    const [ isButtonClicked, setIsButtonClicked ] = useState(false);
    const [ found, setfound ] = useState([])
    const [ reducervalue, forceUpdate ] = useReducer(x => x + 1, 0);
    let username, values;
    const handleit = (e) => {
        username = e.target.name
        values = e.target.value
        setdata({ ...data, [ username ]: values })

    }
    const postdata = (e) => {
        e.preventDefault();
        try {
            const { Fac_ID, courses } = data
            const res = axios.post('https://attendance-s52k.onrender.com/addcourses', {
                Fac_ID,
                courses
            })
        } catch (error) {
            console.log(error);
        }
    }
    const getcourses = async (e) => {
        // e.preventDefault();
        try {
            const { Fac_ID } = data
            const res = await axios.post('https://attendance-s52k.onrender.com/getcourses', {
                Fac_ID
            })
            setfound(res.data.found[ 0 ].courses)
            if (res.status === 200) {
                document.getElementById('student-popup').style.display = 'flex';
                // console.log(res.data.found[ 0 ].courses);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const del_course = () => {
        try {
            const res = axios.post('https://attendance-s52k.onrender.com/deletecourses', {
                Fac_ID: data.Fac_ID,
                courses: course
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (isButtonClicked) {
            del_course();
            getcourses();
        }
    }, [ reducervalue ])
    return (<>
        <div className="form-container">
            <form style={{ 'width': '40%', 'float': 'left' }} onSubmit={postdata}>
                <h1>Add Courses</h1>
                <div className="form-group border-top" style={{ padding: '20px 0' }}>
                    <label htmlFor="exampleInputEmail1">Faculty ID</label>
                    <input type="text" className="form-control" name="Fac_ID" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.Fac_ID}
                        onChange={handleit} placeholder="Enter ID" required />
                </div>
                <div className="form-group" style={{ padding: '20px 0' }}>
                    <label htmlFor="exampleInputPassword1">course</label>
                    <input type="text" className="form-control" name='courses' value={data.courses}
                        onChange={handleit} id="exampleInputPassword1" placeholder="Enter course" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <form style={{ 'width': '40%', 'float': 'right' }} onSubmit={(e) => { e.preventDefault(); getcourses(); }}>
                <h1>View Courses</h1>
                <div className="form-group border-top" style={{ padding: '20px 0' }}>
                    <label htmlFor="exampleInputEmail1">Faculty ID</label>
                    <input type="text" className="form-control" name="Fac_ID" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.Fac_ID}
                        onChange={handleit} placeholder="Enter ID" required />
                </div>
                <button type="submit" className="btn btn-primary">View</button>
            </form>
        </div>
        <div className="view-popup" id='student-popup'>
            <i onClick={() => {
                document.getElementById('student-popup').style.display = 'none'
            }} className="fa-solid fa-xmark close"></i>
            <div className="view-content table-wrapper">
                <table className="table table-striped table-hover" style={{ 'width': '100%' }}>
                    <thead>
                        <tr>
                            <th>Courses</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            found.map((found, index) =>
                                <tr onMouseMove={() => { setcourse(found) }} style={{ 'textAlign': 'center' }} key={index}>
                                    <td>{found}</td>
                                    <td><Button onClick={() => { setIsButtonClicked(true); forceUpdate(); }} variant="outlined" color="error">DELETE</Button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div></div></>

    );
};

export default Course;
