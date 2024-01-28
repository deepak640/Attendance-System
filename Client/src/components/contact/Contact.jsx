import "./Contact.scss"
import React, { useState } from 'react';
const ContactForm = () => {
    const [ Email, setEmail ] = useState('')
    const [ Name, setName ] = useState('')
    const [ Message, setMessage ] = useState('')
    const send = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://attendance-s52k.onrender.com/users/contact', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Email,
                    Name,
                    Message
                })
            })
            const data = await res.json()
            console.log(data);
            if (res.status === 400) {
                alert("somthing went wrong")
            } else if (res.status === 200) {
                window.location.reload()
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (<>
        <div className="contact-page mt-5">
            <div className='contact-message mt-5'>
                <h3>Contact Information</h3>
                <p className='balance'>Fill up the form and our Team will get back to you within 24 hours.</p>
                <div class="contact-col">
                    <div>
                        <i class="fa fa-location-dot"></i>
                        <span>
                            <h5>Rz 26 P/113B </h5>
                            <p>Indra park palam colony </p>
                        </span>
                    </div>
                    <div>
                        <i class="fa fa-phone"></i>
                        <span>
                            <h5>+91 7292098071</h5>
                            <p></p>
                        </span>
                    </div>
                    <div>
                        <i class="fa fa-envelope-o"></i>
                        <span>
                            <h5>Ayushdeepnegi@gmail.com</h5>
                            <p>naruto@gmail.com</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className='contact-form mt-5'>
                <h2 style={{ height: '7vh' }}>Get in touch</h2>
                <form action="POST" onSubmit={send}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                            full Name
                        </label>
                        <input className="form-control" type="text" id="Name" autoComplete='off' required
                            value={Name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input className="form-control" type="email" id="Email" autoComplete='off'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="message">
                            Message
                        </label>
                        <textarea className="form-control" id="message" name='Message' required
                            value={Message}
                            onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <button className="btn btn-danger" type="submit">
                        Send
                    </button>
                </form>
            </div>
        </div>
    </>
    )
}
export default ContactForm