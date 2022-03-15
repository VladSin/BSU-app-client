import {MainLayout} from "../components/MainLayout";
import classes from "../styles/pages/index.module.scss";
import CallbackForm from "../components/CallbackForm/CallbackForm";

export default function Home() {
    return (
        <MainLayout
            title={"Моделирование телекоммуникационных систем"}
            description={"Моделирование телекоммуникационных систем"}
            keywords={"курс, зачет"}
        >
            <section>
                <h1>Моделирование телекоммуникационных систем </h1>
                <p>
                    Для начала сдачи зачёта ведите Ваше имя и фамилию, а также выберете свою группу.
                </p>
                <p>
                    Зачет включает в себя 3 вопроса и одну попытку на прохождение! Удачи!
                </p>
                <div className={classes.callback}>
                    <CallbackForm />
                </div>
                <footer className={classes.header}>
                    <div className={classes.sticky}>
                        <h2>О предмете</h2>
                        <p>
                            Курс Моделирование телекоммуникационных систем предназначен для студентов IV курса
                            специальностей
                            Прикладная информатика и Компьютерная безопасность.
                            Предмет представляет собой вариант формализованного описания телекоммуникационных систем
                            с позиции имитационного моделирования.
                        </p>
                    </div>
                </footer>
            </section>
        </MainLayout>
    )
}
