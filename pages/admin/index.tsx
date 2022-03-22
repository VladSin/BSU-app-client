import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";
import Button from "../../components/Button/Button";
import button from "../../styles/form.module.scss";

export default function Admin() {

    const linkHandlerToUsers = () => {
        Router.push("/admin/users")
    }

    const linkHandlerToQuestions = () => {
        Router.push("/admin/questions")
    }

    return (
        <MainLayout title={'Admin navigation page'}>
            <section>
                <h1>Добро пожаловать!</h1>
                <hr/>
                <span>Короткое руководство:</span>
                <br/>
                <span >
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
                </span>

                <hr/>
                <div>
                    <p>
                        <Button type="button" onClick={linkHandlerToUsers} className={button.button40}>Go to
                            Users</Button>
                        <Button type="button" onClick={linkHandlerToQuestions} className={button.button40}>Go to
                            Questions</Button>
                    </p>
                </div>
            </section>
        </MainLayout>
    )
}
