import { useState } from 'react';
const Register = () => {
    const [ account, setaccount ] = useState({
        Fac_ID: "", Fac_Name: "", Department: "", Phone_no: "", Email: "", Password: ""
    })
    let username, values;
    const handleit = (e) => {
        username = e.target.name
        values = e.target.value
        setaccount({ ...account, [ username ]: values })

    }
    const accountdata = async (e) => {
        e.preventDefault()
        const { Fac_ID, Fac_Name, Department, Phone_no, Email, Password } = account
        const res = await fetch("https://attendance-s52k.onrender.com/users/Register", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Fac_Name, Fac_ID, Department, Phone_no, Email, Password
            })
        })
        if (res.status === 200) {
            var popup = document.getElementById("popup")
            popup.classList.toggle('active')
            document.getElementById('popup-text').innerHTML = "user added successfully"
            setTimeout(function () {
                popup.classList.toggle('active')
                window.location = "/record"
            }, 2000);
        } else if (res.status === 400) {
            var popup = document.getElementById("popup")
            popup.classList.toggle('active')
            document.getElementById('popup-text').innerHTML = "Something went Wrong !"
            setTimeout(function () {
                popup.classList.toggle('active')
            }, 2000);
        } else if (res.status === 401) {
            popup.classList.toggle('active')
            document.getElementById('popup-text').innerHTML = "Password is not strong !"
            setTimeout(function () {
                popup.classList.toggle('active')
            }, 2000);
        } else if (res.status === 422) {
            var popup = document.getElementById("popup")
            popup.classList.toggle('active')
            document.getElementById('popup-text').innerHTML = "Email or ID already exist"
            setTimeout(function () {
                popup.classList.toggle('active')
            }, 2000);
        }
    }
    return (
        <>
            <div className="container" style={{ width: '40%' }}>
                <form id="form" action="" method="" onSubmit={accountdata}>
                    <h3>register</h3>
                    <fieldset>
                        <label htmlFor="ID">ID:</label>
                        <input type="text" tabIndex="1" name='Fac_ID' onChange={handleit} value={account.Fac_ID} required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="name">User name:</label>
                        <input type="text" id="name" tabIndex="1" name='Fac_Name' onChange={handleit} value={account.Fac_Name} required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="phone">Email address:</label>
                        <input type="email" name='Email' onChange={handleit} value={account.Email} required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="phone">Password:</label>
                        <input type="password" name='Password' onChange={handleit} value={account.Password} id="password" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="text" name='Phone_no' onChange={handleit} value={account.Phone_no} id="confirm_password" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="department">Department:</label>
                        <input type="text" name='Department' onChange={handleit} value={account.Department} required />
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="submit">Register</button>
                    </fieldset>
                </form>
            </div>
            <div className='alert alert-danger d-inline-flex p-2' id='popup'>
                <p className='text-center' id='popup-text'></p>
            </div>
        </>
    );
}

export default Register;