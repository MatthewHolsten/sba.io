// import {axios} from 'axios'
// import React from 'react'
import React, {useState} from 'react'
import {useForm} from "react-hook-form"
// import useFetch from "react-fetch-hook"
import QueryAPI from "./QueryAPI"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
// import 'mathjs'

const schema = yup.object().shape({
    loan_amt:       yup.number().required().min(0),
    sba_loan_amt:   yup.number().required().min(0),
    sba_prop:       yup.number().required().max(1).min(0),
    term:           yup.number().required().min(0),
    jobs:           yup.number().required().min(0),
    ind_code:       yup.number().required().min(0),
    state:          yup.string().required().matches(/(^[A-Z]{2}$)/),
    admin:          yup.string().required(),
    density:        yup.string().required(),
    recession:      yup.bool().required().default(false),


});

function Form() {


    const [url, setUrl] = useState("");

    const { register, handleSubmit, formState, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (input_data) => {
        console.log("DATA", input_data)

        // input_data.industry_code = 666666;
        const url_str = makeURL(input_data)
        // "https://matthewholsten.pythonanywhere.com/query/models/country/?loan_amt=100&sba_loan_amt=100&sba_prop=0.5&term=" + input_data.ind_code + "&jobs=400&ind_code=500&state=VA&admin=R&urban=1&recession=0"

        console.log("url_str: ", makeURL(input_data));
        setUrl(url_str)

    };

    const makeURL = (data) => {

        const url_start = "https://matthewholsten.pythonanywhere.com/query/models/";
        const model_type = "country"

        // var rec = 1;
        // // console.log(document.getElementById("recession").checked);
        // if (data.recession == undefined) {
        //     console.log("UNDEF")
        //     rec = "0";
        // }

        const full_url = url_start + model_type         +
            "/?loan_amt="      + data.loan_amt      +
            "&sba_loan_amt="  + data.sba_loan_amt  +
            "&sba_prop="      + data.sba_prop      +
            "&term="          + data.term          +
            "&jobs="          + data.jobs          +
            "&ind_code="      + data.ind_code      +
            "&state="         + data.state         +
            "&admin="         + data.admin         +
            "&density="         + data.density        +
            "&recession="     + data.recession;

            console.log("length:", data.recession.length);
            //TODO add rest of literals as vars, fix formatting
            //todo change "urban" to density
            return full_url;
    }

    const populateRandom = () => {

        const rand_loan_amt     = Math.floor(Math.random() * 1000 + 1) * 1000;
        const rand_sba_prop     = Math.floor(Math.random() * 100) / 100;
        const rand_sba_loan_amt = Math.floor(rand_loan_amt * rand_sba_prop);
        const rand_term         = Math.floor(Math.random() * (300 - 12)) + 12;
        const rand_jobs         = Math.floor(Math.random() * (250 - 10)) + 10;
        const rand_ind_code     = Math.floor(Math.random() * 2000) + 10;

        const rand_admin        = {0: 'd', 1: 'r'}[Math.floor(Math.random() * 2)];
        const rand_density      = {0: 'rural', 1: 'urban', 2: 'unknown'}[Math.floor(Math.random() * 3)];
        const rand_recession    = !Math.floor(Math.random() * 4); // *4 ==> weighted odds

        const states_dict = {
            1: 'AK', 2: 'AL', 3: 'AR', 4: 'AZ', 5: 'CA',
            6: 'CO', 7: 'CT', 8: 'DC', 9: 'DE', 10: 'FL',
            11: 'GA', 12: 'HI', 13: 'IA', 14: 'ID', 15: 'IL',
            16: 'IN', 17: 'KS', 18: 'KY', 19: 'LA', 20: 'MA',
            21: 'MD', 22: 'ME', 23: 'MI', 24: 'MN', 25: 'MO',
            26: 'MS', 27: 'MT', 28: 'NC', 29: 'ND', 30: 'NE',
            31: 'NH', 32: 'NJ', 33: 'NM', 34: 'NV', 35: 'NY',
            36: 'OH', 37: 'OK', 38: 'OR', 39: 'PA', 40: 'RI',
            41: 'SC', 42: 'SD', 43: 'TN', 44: 'TX', 45: 'UT',
            46: 'VA', 47: 'VT', 48: 'WA', 49: 'WI', 50: 'WV', 51: 'WY'
        }

        const rand_state = states_dict[Math.floor(Math.random() * 51) + 1];

        // const rand_ind_code     = Math.floor(Math.random() * (10000 - 1000)) + 1000;
        // const rand_ind_code     = Math.floor(Math.random() * (10000 - 1000)) + 1000;
        // const rand_ind_code     = Math.floor(Math.random() * (10000 - 1000)) + 1000;

        setValue('loan_amt', rand_loan_amt);
        setValue('sba_loan_amt', rand_sba_loan_amt);
        setValue('sba_prop', rand_sba_prop);
        setValue('term', rand_term);
        setValue('jobs', rand_jobs);
        setValue('ind_code', rand_ind_code);
        setValue('state', rand_state);
        setValue('admin', rand_admin);
        setValue('density', rand_density);
        setValue('recession', rand_recession);


        return;
    }



    console.log('errors', formState.errors);


    return (
        <div className="Form">
            <h2 className="title"> <b>
            &nbsp;&nbsp;
            SBA Loan Analysis Tool
            </b></h2>

            <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Matt Holsten, Rob Pitkin
            <br />
            &nbsp;
            Tufts University, CS-135 Machine Learning

            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Spring 2022
            </h5>
            <br />
            <div className="float-container">
            <div className="inputTitles">

            </div>

            <div className="inputFields">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>
                    &nbsp;
                    Lender Loan
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="loan_amt" {...register("loan_amt")} placeholder="U.S. Dollars"/>
                    </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    SBA Guarentee
                    &nbsp;&nbsp;</label>
                    <input type="text" id="sba_loan_amt" {...register("sba_loan_amt")} placeholder="U.S. Dollars"/>

                    <br /><br />


                    <label>
                    &nbsp;
                    Guarentee %
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="sba_prop" {...register("sba_prop")} placeholder="Decimal"/>
                    </label>
                    <br /><br />

                    <label>&nbsp;
                    Term Length
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="term" {...register("term")} placeholder="Months"/>
                    </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Jobs Retained
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="jobs" {...register("jobs")} placeholder="Total"/>
                    </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Industry Code&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" id="ind_code" {...register("ind_code")} placeholder="ID Number"/>
                    </label>
                    <br /><br />

                    <label>&nbsp;
                    State
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" id="state" {...register("state")} placeholder="Abbreviation"/>
                        </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Admin. Party
                    &nbsp; </label>
                        <label>
                        <input type="radio" id="admin_d" {...register("admin")} name="admin" value="d" />
                        Democrat
                        </label>

                        <label>
                        <input type="radio" id="admin_r" {...register("admin")} name="admin" value="r" />
                        Republican
                        </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Pop. Density
                        &nbsp; </label>
                        <label>
                        <input type="radio" id="density_rural" {...register("density")} name="density" value="rural" />
                        Rural
                        </label>

                        <label>
                        <input type="radio" id="density_urban" {...register("density")} name="density" value="urban" />

                        Urban
                        </label>

                        <label>
                        <input type="radio" id="density_unknown" {...register("density")} name="density" value="unknown" />
                        NA
                        </label>
                    <br /><br />

                    <label>
                    &nbsp;
                    Time Period
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <label>
                    <input type="checkbox" id="recession" {...register("recession")} name="recession" value="1"/>

                    Recession
                    </label>

                    <br /><br />

                    &nbsp;

                    <input type="reset"/>


                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <button onClick={populateRandom}>Generate Random</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="submit" id="submit"/>&nbsp;&nbsp;




                </form>

            </div>
            </div>
            <br /><br />
            <b>&nbsp;Model Prediction:&nbsp;&nbsp; </b>
            <em><QueryAPI query_url={url}/></em>
            <br /><br /><br /><br />
            <br /><br /><br /><br />
        </div>
    );
}

export default Form;

//
//
// <input
//     value="Submit"
//     type="button"
//     onClick={() => {
//
//             const url_str = document.getElementById("query_url");
//             const {isLoading, error, data } = useFetch(url_str.value);
//
//             if (isLoading) return "Loading...";
//             if (error) return "Error!";
//
//             const results_elem = document.getElementById("results");
//             results_elem.value = "666";
//
//
//         }
//     }/>
