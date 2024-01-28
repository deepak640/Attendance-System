import axios from "axios";
import { useEffect, useState } from "react";
const Query = () => {
    const [ data, setdata ] = useState([])
    const receive = async () => {
        const res = await axios.get('https://attendance-s52k.onrender.com/users/query')
        setdata(res.data)
        // console.log(res.data[ 0 ]);
    }
    useEffect(() => {
        receive()
    }, [])
    return (
        <>
            <h1 className="text-center mt-5">Welcome to query handling</h1>
            <div className="overflow-auto query-div" style={{ height: '70vh', width: '95%', margin: 'auto' }}>
                {
                    data.map((data, index) =>
                        <div className="container-lg mt-5" key={index}>
                            <p>{data.Message}</p>
                            <h5 className="d-flex justify-content-end">{data.Email}</h5>
                            <hr />
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Query;