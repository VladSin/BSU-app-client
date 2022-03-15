import {MainLayout} from "../../../components/MainLayout";
import {useEffect, useState} from "react";
import Router, {useRouter} from "next/router";
import {NextPageContext} from "next";
import {IQuestion} from "../../../interfaces/question";
import classes from "../../../styles/form.module.scss";
import Button from "../../../components/Button/Button";

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

    const linkHandlerToQuestions = () => {
        Router.push("/admin/questions")
    }

    return (
        <MainLayout title={'Managing Question'}>
            <h1>Question</h1>
            <hr/>
            <p>{question.question}</p>
            <hr/>
            <div>
                <p>
                    <Button type="button" onClick={linkHandlerToQuestions} className={classes.button}>Edit</Button>
                    <Button type="button" onClick={linkHandlerToQuestions} className={classes.button}>Delete</Button>
                    <br/>
                    <Button type="button" onClick={linkHandlerToQuestions} className={classes.button}>Back to list
                        questions</Button>
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
    const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2/${query.id}`)
    const question: IQuestion = await response.json()
    return {props: {question}}
}