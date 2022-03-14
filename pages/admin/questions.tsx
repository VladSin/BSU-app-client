import Router, {useRouter} from "next/router";
import Link from "next/link";
import {MainLayout} from "../../components/MainLayout";
import {useEffect, useState} from "react";
import {IQuestion} from "../../interfaces/questions";
import {NextPageContext} from "next";

interface QuestionsPageProps {
    questions: IQuestion[]
}

export default function Questions({ questions: serverQuestions }: QuestionsPageProps) {

    const [questions, setQuestions] = useState(serverQuestions)
    useEffect(() => {
        async function load() {
            const response = await fetch(`http://localhost:8080/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2/all`)
            const data = await response.json()
            setQuestions(data)
        }
        if (!questions) {
            load()
        }
    }, null)

    if (!questions) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    const linkHandlerToIndex = () => {
        Router.push("/admin")
    }

    return (
        <MainLayout title={'Managing Questions'}>
            <button onClick={linkHandlerToIndex}>Return</button>
            <h1>List Questions</h1>
            <ul>
                {questions.map(question => (
                    <li key={question.id}>
                        <Link href={`/admin/question/[id]`} as={`/admin/question/${question.id}`}>
                            <a>{question.question}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </MainLayout>

    )
}
export async function getServerSideProps({req}: NextPageContext) {
    if (!req) {
        return {questions: null}
    }
    const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2/all`)
    let questions: IQuestion[] = []
    questions = await response.json()
    return {props: {questions}}
}
