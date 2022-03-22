import {Field, Form, Formik} from "formik";
import Button from "../Button/Button";
import * as Yup from "yup";
import classes from "../../styles/form.module.scss";
import lottie from "lottie-web";
import {useEffect, useRef, useState} from "react";
import Router, {useRouter} from "next/router";
import axios from "axios";

interface RegisterPageProps {
    firstName: string;
    lastName: string;
    groupName: string;
}

export default function CallbackForm() {

    const messageRef = useRef(null);
    const [messageSent, setMessageSent] = useState(false);
    const [userId, setUserId] = useState();

    const goToPageWithId = () => {
        if (userId) {
            Router.push(`${process.env.API_URL}/exam/api/questions/userId/${userId}`)
        }
        console.log(userId)
    }

    useEffect(() => {
        lottie.loadAnimation({
            container: messageRef.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: require("../../assets/lotties/message-sent.json"),
        });
    }, [messageSent]);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Поле обязательное"),
        lastName:  Yup.string().required("Поле обязательное"),
        groupName: Yup.string().required("Поле обязательное"),
    });

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                groupName: "",
            }}
            validateOnBlur
            Submit={async (values: RegisterPageProps) => {
                setMessageSent(true);
                console.log("SUBMITTED", values);
                const response = axios.post(`${process.env.API_URL}/exam/api/registration`, values)
                console.log(response)
            }}
            validationSchema={validationSchema}
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
                    <Form className={classes.form}>

                        <div>
                            <label className={classes.label} htmlFor={"firstName"}>Имя</label>
                            <Field
                                type="text"
                                name="firstName"
                                disabled={isSubmitting}
                                inputMode="text"
                                placeholder="Ваше имя (Иван И.)"
                                className={classes.input}
                            />
                            {touched.firstName && errors.firstName && (
                                <span className={classes.error}>{errors.firstName}</span>
                            )}

                            <label className={classes.label} htmlFor={"lastName"}>Фамилия</label>
                            <Field
                                type="text"
                                name="lastName"
                                disabled={isSubmitting}
                                inputMode="text"
                                placeholder="Ваша фамилия (Иванов)"
                                className={classes.input}
                            />
                            {touched.lastName && errors.lastName && (
                                <span className={classes.error}>{errors.lastName}</span>
                            )}

                            <label className={classes.label} htmlFor={"groupName"}>Группа</label>
                            <Field
                                as="select"
                                name="groupName"
                                disabled={isSubmitting}
                                className={classes.input}
                            >
                                <option disabled defaultValue="KB">Выберите группу</option>
                                <option value="KB">КБ</option>
                                <option value="PI">ПИ</option>
                            </Field>
                        </div>

                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className={classes.button}
                            disabled={isSubmitting}>
                            Отправить и начать
                        </Button>

                        {isSubmitting ? (
                            <div className={classes.sent} ref={messageRef}>
                                <Button
                                    type="submit"
                                    onClick={goToPageWithId}
                                    className={classes.button}>
                                    Регистрация прошла успешно! Готовы?
                                </Button>
                            </div>
                        ) : null}
                    </Form>
                </>
            )}
        </Formik>
    );
}
