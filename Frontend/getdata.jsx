import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import toast ,{Toaster} from 'react-hot-toast'
const GetData = () =>{
    useEffect(() =>{
        APICALL();
    },[])
    const [Data , setData] = useState(null)
    const APICALL = async() =>{
        const Result = await axios.get("http://localhost:9000/get-data")
        console.log(Result.data)
        setData(Result.data)
    }
    const DeleteCall = async(id) =>{
        await axios.delete(`http://localhost:9000/delete-data/${id}`)
        toast.success("deleted")
        APICALL()

    }
    return(
        <>
        <Toaster />
        {
            Data ?
            <div>
                {
                    Data.map(ele =>{
                        return(
                            <ul>
                                <li>Name : {ele.name}</li>
                                <li>Age : {ele.age}</li>
                                <li>Email : {ele.email}</li>
                                <li>Mobile : {ele.mobile}</li>
                                <li><button onClick={() => DeleteCall(ele._id)}>Delete</button></li>
                            </ul>
                        )
                    })
                }
            </div> 
            :
            <div>
                API is Still Loading..!
            </div>
        }
        </>
    )
}
export default GetData