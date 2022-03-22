import Link from "next/link";
import {MainLayout} from "../../components/MainLayout";
import {useEffect, useState} from "react";
import {IQuestion} from "../../interfaces/question";
import {NextPageContext} from "next";
import styles from "../../styles/pages/table.module.scss";
import AddQuestionForm from "../../components/QuestionForm/AddQuestionForm";


interface QuestionsPageProps {
    questions: IQuestion[]
}

export default function Questions({questions: serverQuestions}: QuestionsPageProps) {

    const [questions, setQuestions] = useState(serverQuestions)
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/all`)
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

    let i = 0
    const questionList = questions.map(question => {
        i += 1
        return (
            <tr key={question.id}>
                <td>
                    <a>{i}</a>
                </td>
                <td>
                    <Link href={`/admin/question/[id]`} as={`/admin/question/${question.id}`}>
                        <a>{question.question}</a>
                    </Link>
                </td>
            </tr>
        )
    });

    return (
        <MainLayout title={'Managing Questions'}>
            <section>
                <h1>Полный список вопросов</h1>
                <hr/>
                <span>Чсло вопросов в списке: {questionList.length}</span>
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
                <div>
                    <p>
                        <AddQuestionForm/>
                    </p>
                </div>
            </section>
        </MainLayout>
    )
}

export async function getServerSideProps({req}: NextPageContext) {
    if (!req) {
        return {questions: null}
    }
    const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/all`)
    let questions: IQuestion[] = []
    questions = await response.json()
    return {props: {questions}}
}
