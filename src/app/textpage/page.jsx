"use client"


import { useEffect } from 'react'

import { onMessage } from 'firebase/messaging';
import { useState } from 'react';
import { generateFirebaseMessageToken, messaging } from '@/src/utils/firebase.config';

function textPage() {

    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })

    useEffect(() => {
        generateFirebaseMessageToken();
        onMessage(messaging, payload => {
            console.log(payload)
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(preData => ({
            ...preData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/send-message", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData, link: "/contact"})
        })
        console.log(response);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className=''>
                <input type="text" name="title" id="title" onChange={handleChange} />
                <textarea name="body" id="body" onChange={handleChange}></textarea>
                <button type="submit">Send Message</button>
            </form>
        </>
    )
}

export default textPage
