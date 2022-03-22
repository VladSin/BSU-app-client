import {Field, Form, Formik} from "formik";
import Button from "../Button/Button";
import classes from "../../styles/form.module.scss";
import {useState} from "react";
import axios from "axios";
import Router from "next/router";

interface AddQuestionProps {
    question: string;
}

export default function AddQuestionForm() {

    const [messageSent, setMessageSent] = useState(false);
    const linkHandlerToIndex = () => {
        Router.push("/admin")
    }
    return (
        <Formik
            initialValues={{
                question: "",
            }}
            validateOnBlur
            onSubmit={async (values: AddQuestionProps) => {
                setMessageSent(true);
                console.log("SUBMITTED", values);
                const response = axios.post(`${process.env.API_URL}/question/api/v1/adminId/${process.env.ID}`, values)
                console.log(response)
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
                                <label className={classes.label} htmlFor={"question"}>Add</label>
                                <Field
                                    type="text"
                                    name="question"
                                    disabled={isSubmitting}
                                    inputMode="text"
                                    placeholder="Новый вопрос"
                                    className={classes.input}
                                />
                            </div>

                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className={classes.button}
                                disabled={isSubmitting}>
                                Add New Question
                            </Button>

                            <Button type="button" onClick={linkHandlerToIndex} className={classes.button}>Return</Button>
                        </Form>
                    </section>

                </>
            )}
        </Formik>
    );
}
