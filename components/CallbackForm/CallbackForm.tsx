import {Field, Form, Formik} from "formik";
import Button from "../Button/Button";
import * as Yup from "yup";
import classes from "../../styles/form.module.scss";
import lottie from "lottie-web";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {IUser} from "../../interfaces/user";

interface RegisterPageProps {
    firstName: string;
    lastName: string;
    groupName: string;
}

interface UserPageProps {
    user: IUser
}

export default function CallbackForm({user: serverUser}: UserPageProps) {

    const [user, setUser] = useState(serverUser);
    const router = useRouter()
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/exam/api/registration`)
            const data = await response.json()
            setUser(data)
        }
    }, null)

    const messageRef = useRef(null);
    const [messageSent, setMessageSent] = useState(false);
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
        lastName: Yup.string().required("Поле обязательное"),
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
            onSubmit={(values: RegisterPageProps) => {
                setMessageSent(true);
                console.log(values);
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
                            <label className={classes.label} htmlFor={"firstName"}>
                                Имя
                            </label>
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

                            <label className={classes.label} htmlFor={"lastName"}>
                                Фамилия
                            </label>
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

                            <label className={classes.label} htmlFor={"groupName"}>
                                Группа
                            </label>
                            <Field
                                type="text"
                                name="groupName"
                                disabled={isSubmitting}
                                inputMode="text"
                                placeholder="Группа (KB/PI)"
                                className={classes.input}
                            />
                            {touched.groupName && errors.groupName && (
                                <span className={classes.error}>{errors.groupName}</span>
                            )}

                        </div>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className={classes.button}
                            disabled={isSubmitting}
                        >
                            Отправить и начать
                        </Button>
                        {isSubmitting ? (
                            <div className={classes.sent} ref={messageRef}>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className={classes.button}>
                                    <Link href={`/exam/[id]`} as={`/exam/${user.id}`}>
                                        <a>{user.firstName}, регистрация прошла успешно! Готовы?</a>
                                    </Link>
                                </Button>
                            </div>
                        ) : null}
                    </Form>
                </>
            )}
        </Formik>
    );
}

export async function getServerSideProps({req}) {
    if (!req) {
        return {user: null}
    }
    const response = await fetch(`${process.env.API_URL}/exam/api/registration`)
    const user: IUser = await response.json()
    return {props: {user}}
}

