import {IQuestion} from "../../interfaces/question";
import {NextPageContext} from "next";
import {IAnswer} from "../../interfaces/answer";
import {useEffect, useState} from "react";
import {MainLayout} from "../../components/MainLayout";
import Router, {useRouter} from "next/router";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import classes from "../../styles/form.module.scss";
import Button from "../../components/Button/Button";

interface QuestionsPageProps {
    questions: IQuestion[]
}

interface AnswersPageProps {
    answers: IAnswer[]
}

interface AnswerPageProps {
    answer: IAnswer
}

export default function Exam({questions: serverQuestions}: QuestionsPageProps) {

    const [questions, setQuestions] = useState(serverQuestions)
    const [messageSent, setMessageSent] = useState(false);
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
            <Formik
                initialValues={{
                    answers: [],
                }}
                validateOnBlur
                onSubmit={async (values: AnswersPageProps) => {
                    setMessageSent(true);
                    console.log("SUBMITTED", values);
                    const response = axios.post(`${process.env.API_URL}/api/answers/userId/${router.query.id}`, values.answers)
                    console.log(response)
                    Router.push("/")
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                  }) => (
                    <>
                        <section>
                            <Form className={classes.form}>

                                <hr/>
                                <p>{questionList.at(0)}</p>

                                <div className={classes.callback}>
                                    <label className={classes.label} htmlFor={"answer"}>Ответ</label>
                                    <Field
                                        type="text"
                                        name="answer"
                                        disabled={isSubmitting}
                                        inputMode="text"
                                        placeholder="Ваш ответ"
                                        className={classes.input}
                                    />
                                </div>

                                <hr/>
                                <p>{questionList.at(1)}</p>

                                <div className={classes.callback}>
                                    <label className={classes.label} htmlFor={"answer"}>Ответ</label>
                                    <Field
                                        type="text"
                                        name="answer"
                                        disabled={isSubmitting}
                                        inputMode="text"
                                        placeholder="Ваш ответ"
                                        className={classes.input}
                                    />
                                </div>

                                <hr/>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className={classes.button}
                                    disabled={isSubmitting}>
                                    Отправить и сохранить
                                </Button>

                            </Form>
                        </section>

                    </>
                )}
            </Formik>
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
