import { useState } from "react";
import "./cards.scss"
function Cards(prop) {
    const [course, setcourse] = useState('')
    localStorage.setItem("course", course)
    return (
        <>
            <div className="card">
                <div className="pb"><h1>{prop.header}</h1></div>
                <div className="info">
                    <h1>{course}</h1>
                    <h2>Hover me</h2>
                </div>
                <div className="buttons">
                    <a id="detailed" href={prop.link}
                        onClick={() => {
                            setcourse(prop.header)
                        }}
                    >Click</a>
                </div>
            </div>
        </>
    );
}

export default Cards;