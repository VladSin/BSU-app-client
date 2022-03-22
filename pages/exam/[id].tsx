import {IQuestion} from "../../interfaces/question";
import {NextPageContext} from "next";
import {IAnswer} from "../../interfaces/answer";
import {useEffect, useState} from "react";
import {MainLayout} from "../../components/MainLayout";
import Router, {useRouter} from "next/router";
import styles from "../../styles/pages/table.module.scss";
import Link from "next/link";
import AddQuestionForm from "../../components/QuestionForm/AddQuestionForm";
import {IUser} from "../../interfaces/user";


interface QuestionsPageProps {
    questions: IQuestion[]
}

export default function Exam({questions: serverQuestions}: QuestionsPageProps) {

    const [questions, setQuestions] = useState(serverQuestions)
    const router = useRouter()
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/exam//api/questions/userId/${router.query.id}`)
            const data = await response.json()
            console.log("DATA: ", data)
            setQuestions(data)
        }

        if (!questions) {
            load()
        }
    }, [])

    if (!questions) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    let i = 0
    const questionList = questions.map(question => {
        i += 1
        return (
            <tr key={question.id}>
                <td>
                    <a>{i}</a>
                </td>
                <td>
                    <a>{question.question}</a>
                </td>
            </tr>
        )
    });

    return (
        <MainLayout title={'Exam Questions'}>
            <section>
                <h1>Удачи!</h1>
                <hr/>
                <div className={styles.div}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>QUESTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {questionList}
                        </tbody>
                    </table>
                </div>
                <hr/>
            </section>
        </MainLayout>
    )
}

interface UserNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

export async function getServerSideProps({query, req}: UserNextPageContext) {
    if (!req) {
        return {questions: null}
    }
    const response = await fetch(`${process.env.API_URL}/exam/api/questions/userId/${query.id}`)
    const questions: IQuestion[] = await response.json()
    return {props: {questions}}
}
