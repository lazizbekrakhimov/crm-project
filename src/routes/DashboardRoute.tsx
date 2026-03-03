import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboardHome, Groups, GroupsCrud, GroupsMore, NotFound, Rooms, RoomsCrud, Stacks, StacksCrud, StacksMore, Students, StudentsCrud, StudentsMore, Teachers, TeachersCrud, TeachersMore, Users } from "../pages"
import { Header, Sitebar } from "../modules"
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import { GetMe } from "../service"
import { useCookies } from "react-cookie"

const DashboardRoute = () => {
    const [cookies] = useCookies(['token'])
    const { collapse } = useContext(Context)
    const { data: userInfo = {} } = GetMe(cookies.token)
    const [routeList, setRouteList] = useState([
        { id: 1, path: PATH.home, element: <DashboardHome /> },
        { id: 2, path: PATH.stacks, element: <Stacks /> },
        { id: 3, path: PATH.stacksMore, element: <StacksMore /> },
        { id: 4, path: PATH.stacksCreate, element: <StacksCrud /> },
        { id: 5, path: PATH.stacksUpdate, element: <StacksCrud /> },
        { id: 6, path: PATH.groups, element: <Groups title="Guruhlar" /> },
        { id: 7, path: PATH.groupsMore, element: <GroupsMore /> },
        { id: 8, path: PATH.groupsCreate, element: <GroupsCrud /> },
        { id: 9, path: PATH.groupsUpdate, element: <GroupsCrud /> },
        { id: 10, path: PATH.stacksGroupCreate, element: <GroupsCrud /> },
        { id: 11, path: PATH.stacksMoreByGroupMore, element: <GroupsMore /> },
        { id: 12, path: PATH.stacksMoreByGroupUpdate, element: <GroupsCrud /> },
        { id: 13, path: PATH.teachers, element: <Teachers /> },
        { id: 14, path: PATH.teachersMore, element: <TeachersMore /> },
        { id: 15, path: PATH.teachersCreate, element: <TeachersCrud /> },
        { id: 16, path: PATH.teachersUpdate, element: <TeachersCrud /> },
        { id: 17, path: PATH.teachersGroupCreate, element: <GroupsCrud /> },
        { id: 18, path: PATH.teachersMoreByGroupMore, element: <GroupsMore /> },
        { id: 19, path: PATH.teachersMoreByGroupUpdate, element: <GroupsCrud /> },
        { id: 20, path: PATH.students, element: <Students /> },
        { id: 21, path: PATH.studentsMore, element: <StudentsMore /> },
        { id: 22, path: PATH.studentsCreate, element: <StudentsCrud /> },
        { id: 23, path: PATH.studentsUpdate, element: <StudentsCrud /> },
        { id: 24, path: PATH.groupsStudentsCreate, element: <StudentsCrud /> },
        { id: 25, path: PATH.groupsMoreByStudentsMore, element: <StudentsMore /> },
        { id: 26, path: PATH.groupsMoreByStudentsUpdate, element: <StudentsCrud /> },
        { id: 27, path: PATH.rooms, element: <Rooms /> },
        { id: 28, path: PATH.roomsCreate, element: <RoomsCrud /> },
        { id: 29, path: PATH.roomsUpdate, element: <RoomsCrud /> },
        { id: 30, path: PATH.notFound, element: <NotFound /> }
    ])

    useEffect(() => {
        if (userInfo.role === "super_admin") {
            setRouteList(last => {
                const alreadyAdded = last.some(r => r.path === PATH.users)
                if (alreadyAdded) return last
                return [...last, { id: last[last.length - 1].id + 1, path: PATH.users, element: <Users /> }]
            })
        }
    }, [userInfo])

    return (
        <div className="flex bg-white">
            <Sitebar />
            <div className={`${collapse ? "w-full" : "w-[95%]"} duration-300 h-screen overflow-y-auto`}>
                <Header />
                <div className="bg-amber-300">
                    <div className="h-screen bg-white rounded-tl-2xl border-t-transparent border-l-transparent">
                        <Routes> {routeList.map((item) => (<Route key={item.id} path={item.path} element={item.element} />))} </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardRoute