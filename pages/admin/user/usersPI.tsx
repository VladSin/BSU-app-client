import {IUser} from "../../../interfaces/user";
import {NextPageContext} from "next";
import {useEffect, useState} from "react";
import {MainLayout} from "../../../components/MainLayout";
import Link from "next/link";
import Router from "next/router";
import Button from "../../../components/Button/Button";
import button from "../../../styles/form.module.scss";
import tableClasses from "../../../styles/pages/table.module.scss";

interface UsersPageProps {
    users: IUser[]
}

export default function UsersPI({users: serverUsers}: UsersPageProps) {

    const [users, setUsers] = useState(serverUsers)
    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/user/api/v1/adminId/${process.env.ID}/all/pi`)
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
        Router.push("/admin/users")
    }

    return (
        <MainLayout title={'Managing Users'}>
            <h1>Специальность ПИ</h1>
            <hr/>
            <div>
                <ul>
                    <span>Число студентов специальности ПИ: {userList.length}</span>
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
                    <Button type="button" onClick={linkHandlerToIndex} className={button.button}>Return</Button>
                </p>
            </div>
        </MainLayout>
    )

}

export async function getServerSideProps({req}: NextPageContext) {
    if (!req) {
        return {users: null}
    }
    const response = await fetch(`${process.env.API_URL}/user/api/v1/adminId/${process.env.ID}/all/pi`)
    let users: IUser[] = []
    users = await response.json()
    return {props: {users}}
}
