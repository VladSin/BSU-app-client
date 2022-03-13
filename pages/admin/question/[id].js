import {MainLayout} from "../../../components/MainLayout";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


export default function Question({ question: serverQuestion }) {
    const [question, setQuestion] = useState(serverQuestion)
    const router = useRouter()
    useEffect(() => {
        async function load() {
            const response = await fetch(`http://localhost:8080/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2/${router.query.id}`)
            const data = await response.json()
            setQuestion(data)
        }
        if (!question) {
            load()
        }
    }, null)

    if (!question) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    return(
        <MainLayout>
            <h1>Question</h1>
            <hr />
            <p>{question.question}</p>
            <Link href={'/admin/questions'}><a>Back to list questions</a></Link>
        </MainLayout>
    )
}

export async function getServerSideProps({query, req}) {
    if (!req) {
        return {question: null}
    }
    const response = await fetch(`http://localhost:8080/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2/${query.id}`)
    const question = await response.json()
    return {props: {question}}
}