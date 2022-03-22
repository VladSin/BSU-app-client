import {MainLayout} from "../../../components/MainLayout";
import {useEffect, useState} from "react";
import Router, {useRouter} from "next/router";
import {NextPageContext} from "next";
import {IQuestion} from "../../../interfaces/question";
import EditOrDeleteQuestionForm from "../../../components/QuestionForm/EditOrDeleteQuestionForm";
import axios from "axios"

interface QuestionPageProps {
    question: IQuestion
}

export default function Question({question: serverQuestion}: QuestionPageProps) {

    const [question, setQuestion] = useState(serverQuestion)
    const router = useRouter()
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2/${router.query.id}`)
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

    const linkHandlerToDeleteQuestions = () => {

        try {
            axios.delete(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/${question.id}`)
            Router.push("/admin/questions")
        } catch {
            console.log("Errr")
        }
    }

    return (
        <MainLayout title={'Managing Question'}>
            <h1>Question</h1>
            <hr/>
            <br/>
            <p>{question.question}</p>
            <hr/>
            <div>
                <p>
                    <EditOrDeleteQuestionForm/>
                </p>
            </div>
        </MainLayout>
    )
}

interface QuestionNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

export async function getServerSideProps({query, req}: QuestionNextPageContext) {
    if (!req) {
        return {question: null}
    }
    const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/${query.id}`)
    const question: IQuestion = await response.json()
    return {props: {question}}
}
