import {Field, Form, Formik} from "formik";
import Button from "../Button/Button";
import classes from "../../styles/form.module.scss";
import {useState} from "react";
import axios from "axios";
import Router from "next/router";

interface QuestionProps {
    id: string;
    question: string;
}

export default function AddQuestionForm() {

    const [messageSent, setMessageSent] = useState(false);

    const linkHandlerToQuestions = () => {
        Router.push("/admin/questions")
    }

    const linkHandlerToDeleteQuestion = () => {
        try {
            axios.delete(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}/`)
            Router.push("/admin/questions")
        } catch {
            console.log("Errr")
        }
    }


    return (
        <Formik
            initialValues={{
                id: "",
                question: "",
            }}
            validateOnBlur
            onSubmit={async (values: QuestionProps) => {
                setMessageSent(true);
                console.log("SUBMITTED", values);
                const response = axios.put(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}`, values.question)
                console.log(response)
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

                            <Button type="button" onClick={linkHandlerToQuestions} className={classes.button}>
                                Back to list questions
                            </Button>
                        </Form>
                    </section>

                </>
            )}
        </Formik>
    );
}
