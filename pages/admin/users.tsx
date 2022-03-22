import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";
import {useEffect, useState} from "react";
import {NextPageContext} from "next";
import Button from "../../components/Button/Button";
import button from "../../styles/form.module.scss";
import tableClasses from "../../styles/pages/table.module.scss";
import {IUser} from "../../interfaces/user";
import Link from "next/link";


interface UsersPageProps {
    users: IUser[]
}

export default function Users({users: serverUsers}: UsersPageProps) {

    const [users, setUsers] = useState(serverUsers)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/user/api/v1/adminId/${process.env.ID}/all`)
            const data = await response.json()
            setUsers(data)
        }

        if (!users) {
            load()
        }
    }, null)

    if (!users) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    const userList = users.map(user => {
        return (
            <tr key={user.id}>
                <td style={{whiteSpace: 'nowrap'}}>
                    <Link href={`/admin/user/[id]`} as={`/admin/user/${user.id}`}>
                        <a>{user.firstName} {user.lastName}</a>
                    </Link>
                </td>
                <td style={{whiteSpace: 'nowrap'}}>
                    <a>{user.groupName}</a>
                </td>
            </tr>
        )
    });

    const linkHandlerToIndex = () => {
        Router.push("/admin")
    }
    const linkHandlerToUsersKB = () => {
        Router.push("/admin/user/usersKB")
    }
    const linkHandlerToUsersPI = () => {
        Router.push("/admin/user/usersPI")
    }

    return (
        <MainLayout title={'Managing Users'}>
            <h1>Пользователи зарегистрированные в системе</h1>
            <hr/>
            <div>
                <p>
                    <Button type="button" onClick={linkHandlerToUsersKB} className={button.button20}>Students of KB
                        specialty</Button>
                    <Button type="button" onClick={linkHandlerToIndex} className={button.button20}>Return</Button>
                    <Button type="button" onClick={linkHandlerToUsersPI} className={button.button20}>Students of PI
                        specialty</Button>
                </p>
            </div>
            <hr/>
            <div>
                <ul>
                    <span>Общее число пользователей в списке: {userList.length}</span>
                    <table className={tableClasses.table}>
                        <tbody>
                        {userList}
                        </tbody>
                    </table>
                </ul>
            </div>
            <hr/>
            <div>
                <p>
                    <Button type="button" onClick={linkHandlerToUsersKB} className={button.button20}>Students of KB
                        specialty</Button>
                    <Button type="button" onClick={linkHandlerToIndex} className={button.button20}>Return</Button>
                    <Button type="button" onClick={linkHandlerToUsersPI} className={button.button20}>Students of PI
                        specialty</Button>
                </p>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps({req}: NextPageContext) {
    if (!req) {
        return {users: null}
    }
    const response = await fetch(`${process.env.API_URL}/user/api/v1/adminId/${process.env.ID}/all`)
    let users: IUser[] = []
    users = await response.json()
    return {props: {users}}
}
