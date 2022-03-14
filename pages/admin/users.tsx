import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";
import {useEffect, useState} from "react";

export default function Users() {

    const [users] = useState([])

    useEffect(() => {
        async function load() {
            fetch('')
        }
    }, [])

    const linkHandlerToIndex = () => {
        Router.push("/admin")
    }

    return (
        <MainLayout title={'Managing Users'}>
            <h1>Hello Users!</h1>
            <button onClick={linkHandlerToIndex}>Return</button>
        </MainLayout>

    )
}