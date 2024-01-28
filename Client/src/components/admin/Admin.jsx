import "./Admin.scss"
const Admin = () => {
    return (
        <>
            <div className=" container Admin-container">
                <div className="item item--1 rounded d-flex  justify-content-center align-items-center btn-1"> <a href="/Update-student">Update Student</a></div>
                <div className="item item--2 rounded d-flex  justify-content-center align-items-center btn-1"> <a href="/register-faculty"> Register Faculty</a></div>
                <div className="item item--3 rounded d-flex  justify-content-center align-items-center btn-1"> <a href="/Record">Record</a></div>
                <div className="item item--4 rounded d-flex  justify-content-center align-items-center btn-1"> <a href="/Handling">Query Handling</a></div>
                <div className="item item--5 rounded d-flex  justify-content-center align-items-center btn-1"> <a href="/update-Courses">Update Courses</a></div>
            </div>

        </>
    );
}

export default Admin;