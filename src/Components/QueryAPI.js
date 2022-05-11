// import {axios} from 'axios'
// import React from 'react'
import useFetch from "react-fetch-hook"
// import Result from './Result.js'
// import React, {useState, useEffect} from 'react'

const err_msg = "Please enter valid input.";
const out_0_msg     = "High Risk Loan ❌";
const out_1_msg     = "Low Risk Loan ✅";
const out_other_msg = "Issue with result.";


export default function QueryAPI(props) {

    const getOutputStr = (data_json) => {
        const out = data_json.output
        if (out === "0") {
            console.log("Output: 0")
            return (out_0_msg)

        } else if (out === "1") {
            console.log("Output: 1")
            return (out_1_msg)
        }

        console.log("Output: -1")
        return (out_other_msg)
    }


    const {isLoading, error, data } = useFetch(props.query_url);

    if (isLoading) return ("Loading... ⏳");
    if (error) return (err_msg);

    console.log(data.output)

    return (
        getOutputStr(data)
    )

}
