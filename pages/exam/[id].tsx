import {IQuestion} from "../../interfaces/question";
import {NextPageContext} from "next";
import {IUser} from "../../interfaces/user";
import {IAnswer} from "../../interfaces/answer";
import {useEffect, useState} from "react";
import {MainLayout} from "../../components/MainLayout";
import {useRouter} from "next/router";

interface QuestionsPageProps {
    questions: IQuestion[]
}

interface UserPageProps {
    user: IUser
}

interface AnswerPageProps {
    answer: IAnswer
}

export default function Exam({questions: serverQuestions}: QuestionsPageProps) {

    const [questions, setQuestions] = useState(serverQuestions)
    const router = useRouter()
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/api/questions/userId/${router.query.id}`)
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

    const questionList = questions.map(question => {
        return (
            <tr key={question.id}>
                <td style={{whiteSpace: 'nowrap'}}>
                    <li key={question.id}>
                        <a>{question.question}</a>
                    </li>
                </td>
            </tr>
        )
    });

    return (
        <MainLayout title={'Exam'}>
            <h1>Good Luck!</h1>
            <hr/>

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
        return {questions: null}
    }
    const response = await fetch(`${process.env.API_URL}/api/questions/userId/${query.id}`)
    let questions: IQuestion[] = []
    questions = await response.json()
    return {props: {questions}}
}