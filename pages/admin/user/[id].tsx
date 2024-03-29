import {IUser} from "../../../interfaces/user";
import {NextPageContext} from "next";
import {useEffect, useState} from "react";
import Router, {useRouter} from "next/router";
import {MainLayout} from "../../../components/MainLayout";
import classes from "../../../styles/pages/table.module.scss";
import button from "../../../styles/form.module.scss";
import Button from "../../../components/Button/Button";

interface UserPageProps {
    user: IUser
}

export default function User({user: serverUser}: UserPageProps) {

    const [user, setUser] = useState(serverUser)
    const router = useRouter()
    useEffect(() => {
        async function load() {
            const response = await fetch(
                `${process.env.API_URL}/user/api/v1/adminId/${process.env.ID}/userId/${router.query.id}`)
            const data = await response.json()
            setUser(data)
        }

        if (!user) {
            load()
        }
    }, null)

    if (!user) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    const linkHandlerToUsers = () => {
        Router.push("/admin/users")
    }
    let i = 0;
    const answerList = user.answers.map(answer => {
        i += 1
        return (
            <tr key={answer.id}>
                <td>
                    <a>№ {i}</a>
                </td>
                <td>
                    <a>{answer.question}</a>
                </td>
                <td>
                    <a>{answer.answer}</a>
                </td>
            </tr>
        )
    });

    return (
        <MainLayout title={'Managing User'}>
            <section>
                <h1>{user.firstName} {user.lastName} ({user.groupName})</h1>
                <hr/>
                <br/>
                <div className={classes.div}>
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>QUESTION</th>
                            <th>ANSWER</th>
                        </tr>
                        </thead>
                        <tbody>
                        {answerList}
                        </tbody>
                    </table>
                </div>

                <hr/>
                <div>
                    <p>
                        <Button type="button" onClick={linkHandlerToUsers} className={button.button}>
                            Back to list users
                        </Button>
                    </p>
                </div>
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
        return {user: null}
    }
    const response = await fetch(`${process.env.API_URL}/user/api/v1/adminId/${process.env.ID}/userId/${query.id}`)
    const user: IUser = await response.json()
    return {props: {user}}
}
