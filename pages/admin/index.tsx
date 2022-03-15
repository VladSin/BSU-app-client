import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";
import classes from "../../styles/form.module.scss";
import Button from "../../components/Button/Button";

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
            <hr />
            Короткое руководство:
            <ul>
                <li>
                    Go to Users - переход к списку всех пользователей, зарегестрированных в системе,
                    а также к результатам сдачи зачета/экзамена.
                </li>
                <li>
                    Go to Questions - переход к списку всех вопросов, внесенных в систему,
                    а также возможность их редактирование, удаления и добавления новых.
                </li>
            </ul>
            <hr />
            <div>
                <p>
                    <Button type="button" onClick={linkHandlerToUsers} className={classes.button}>Go to Users</Button>
                    <Button type="button" onClick={linkHandlerToQuestions} className={classes.button}>Go to Questions</Button>
                </p>
            </div>
        </MainLayout>
    )
}