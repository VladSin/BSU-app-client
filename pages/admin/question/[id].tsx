import {MainLayout} from "../../../components/MainLayout";
import {useEffect, useState} from "react";
import Router, {useRouter} from "next/router";
import {NextPageContext} from "next";
import {IQuestion} from "../../../interfaces/question";
import axios from "axios"
import {Field, Form, Formik} from "formik";
import classes from "../../../styles/form.module.scss";
import Button from "../../../components/Button/Button";

interface QuestionPageProps {
    question: IQuestion
}

interface QuestionProps {
    question: string;
}

export default function Question({question: serverQuestion}: QuestionPageProps) {

    const [question, setQuestion] = useState(serverQuestion)
    const [messageSent, setMessageSent] = useState(false);

    const router = useRouter()
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/${router.query.id}`)
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

    const linkHandlerToDeleteQuestion = () => {
        try {
            axios.delete(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/${router.query.id}`)
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
                    <Formik
                        initialValues={{
                            question: "",
                        }}
                        validateOnBlur
                        onSubmit={async (values: QuestionProps) => {
                            setMessageSent(true);
                            console.log("SUBMITTED", values);
                            await axios.post(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/${router.query.id}`, values)
                            Router.push("/admin/questions")
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

                                        <div className={classes.callback}>
                                            <label className={classes.label} htmlFor={"question"}>Edit</label>
                                            <Field
                                                type="text"
                                                name="question"
                                                disabled={isSubmitting}
                                                inputMode="text"
                                                placeholder="Заменить вопрос на:"
                                                className={classes.input}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className={classes.button}
                                            disabled={isSubmitting}>
                                            Edit Question
                                        </Button>

                                        <Button
                                            type="button"
                                            onClick={linkHandlerToDeleteQuestion}
                                            className={classes.button}
                                            disabled={isSubmitting}>
                                            Delete Question
                                        </Button>

                                        <Button type="button" onClick={linkHandlerToQuestions}
                                                className={classes.button}>
                                            Back to list questions
                                        </Button>
                                    </Form>
                                </section>

                            </>
                        )}
                    </Formik>
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
