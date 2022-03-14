import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";

export default function Admin() {

    const linkHandlerToUsers = () => {
        Router.push("/admin/users")
    }

    const linkHandlerToQuestions = () => {
        Router.push("/admin/questions")
    }

    return (
        <MainLayout title={'Admin navigation page'}>
            <h1>Добро пожаловать!</h1>
            <button onClick={linkHandlerToUsers}>Go to Users</button>
            <button onClick={linkHandlerToQuestions}>Go to Questions</button>
        </MainLayout>
    )
}