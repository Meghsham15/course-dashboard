import React, { useState } from 'react';
import students from '../data/students';
import User from './User';

const Popup = (props) => {

    function handleChange(e) {
        let studentId = e.target.value;
        students.forEach((ele) => {
            if (ele.id === Number(studentId)) {
                User.addUser(ele);
                loadData(ele.id);
                props.setAuth(true);
            }
        })
    }

    async function loadData(id){
        let res = await fetch("/getRatings", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: id
            })
        });
        let data = await res.json();
        User.addUserRatings(data.ratings);
        console.log(data.ratings);
    }

    return (
        <div className='popup'>
            <select onChange={(e) => handleChange(e)}>
                <option hidden defaultChecked>Select an example student</option>
                {students.map((e) => {
                    return <option value={e.id}>{e.name}</option>
                })}
            </select>
        </div>
    );
};

export default Popup;
