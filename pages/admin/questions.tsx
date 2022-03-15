import Router from "next/router";
import Link from "next/link";
import {MainLayout} from "../../components/MainLayout";
import {useEffect, useState} from "react";
import {IQuestion} from "../../interfaces/question";
import {NextPageContext} from "next";
import Button from "../../components/Button/Button";
import classes from "../../styles/form.module.scss";


interface QuestionsPageProps {
    questions: IQuestion[]
}

export default function Questions({questions: serverQuestions}: QuestionsPageProps) {

    const [questions, setQuestions] = useState(serverQuestions)
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/6338b801-4ed2-47e0-8a44-88f0d8da2ea2/all`)
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

    const questionList = questions.map(question => {
        return (
            <tr key={question.id}>
                <td style={{whiteSpace: 'nowrap'}}>
                    <li key={question.id}>
                        <Link href={`/admin/question/[id]`} as={`/admin/question/${question.id}`}>
                            <a>{question.question}</a>
                        </Link>
                    </li>
                </td>
            </tr>
        )
    });

    return (
        <MainLayout title={'Managing Questions'}>
            <h1>List all Questions</h1>
            <hr/>
            <div>
                <ul>
                    <table>
                        <thead>
                        <tr>
                            <th>Чсло вопросов в списке: {questionList.length}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {questionList}
                        </tbody>
                    </table>
                </ul>
            </div>
            <hr/>
            <div>
                <p>
                    <Button type="button" onClick={linkHandlerToIndex} className={classes.button}>Return</Button>
                    <Button type="button" onClick={linkHandlerToIndex} className={classes.button}>Add New
                        Question</Button>
                </p>
            </div>
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
