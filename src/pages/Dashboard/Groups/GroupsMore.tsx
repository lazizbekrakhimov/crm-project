import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById, Create } from "../../../service"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"
import { Button, Modal, Select } from "antd"
import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"

const GroupsMore = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [cookies] = useCookies(['token'])
    const [delModal, setDelModal] = useState<boolean>(false)
    const [enrollModal, setEnrollModal] = useState<boolean>(false)
    const [studentId, setStudentId] = useState<number | null>(null)
    const [enrollStatus, setEnrollStatus] = useState<string>("pending")
    const queryClient = useQueryClient()

    // Group Get By Id
    const { data: moreInfo = {}, isLoading } = GetById(id, cookies.token, QueryPATH.groupsMore, "/groups")

    // Group Delete
    const { mutate: DeleteStack, isPending } = Delete(cookies.token, `/groups/${id}`, navigate, queryClient, QueryPATH.groups)

    // Enrollment Create
    const { mutate: EnrollCreate, isPending: enrollLoading } = Create(cookies.token, "/enrollments", navigate, queryClient, QueryPATH.groupsMore)

    function handleEnrollSubmit() {
        if (!studentId) return
        EnrollCreate({ studentId, groupId: Number(id), status: enrollStatus })
        setEnrollModal(false)
        setStudentId(null)
        setEnrollStatus("pending")
    }

    const column = [
        { title: "ID", dataIndex: "id" },
        { title: "Ismi", dataIndex: "firstName" },
        { title: "Familiya", dataIndex: "lastName" },
        { title: "Email", dataIndex: "email" },
        { title: "Telefon raqam", dataIndex: "phone" },
        { title: "Batafsil", dataIndex: "actions", render: (_: any, record: any) => (<Button size="medium" type="primary" onClick={() => navigate(`/students/${record.id}`)} className="bg-amber-500! hover:bg-amber-400!" icon={<MoreOutlined />}></Button>) },
    ]

    return (
        <div className="p-5">
            <div className="flex items-center justify-between p-8 mb-5">
                <div className="flex gap-6 items-center">
                    <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />}></Button>
                    <h2 className="font-bold text-[25px]">{isLoading ? "Loading..." : moreInfo.name}</h2>
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => setDelModal(true)} className="bg-red-500! hover:bg-red-400!" type="primary" size="large" icon={<DeleteFilled />}></Button>
                    <Button onClick={() => setEnrollModal(true)} type="primary" icon={<PlusCircleOutlined />} size="large">O'quvchi qo'shish</Button>
                    <Button onClick={() => navigate("update")} size="large" type="primary" icon={<EditFilled />}>Tahrirlash</Button>
                </div>
            </div>
            <div className="flex justify-center gap-5 mt-5 mx-10">
                <div className="w-[50%] shadow-lg rounded-2xl space-y-3 p-5 border border-slate-100">
                    <div className="text-[18px] font-bold">
                        <span className="text-amber-500!">#ID: </span>
                        <strong>{id}</strong>
                    </div>
                    <div className="text-[18px] font-bold">
                        <span className="text-amber-500!">Nomi: </span>
                        <strong>{moreInfo.name}</strong>
                    </div>
                    <div className="text-[18px] font-bold">
                        <span className="text-amber-500!">Yo'nalish nomi: </span>
                        <strong>{moreInfo?.stack?.name}</strong>
                    </div>
                    <div className="text-[18px] font-bold">
                        <span className="text-amber-500!">Ustoz: </span>
                        <strong>{moreInfo?.teacher?.firstName} {moreInfo?.teacher?.lastName}</strong>
                    </div>
                </div>
                <div className="w-[50%] shadow-lg rounded-2xl space-y-4 p-5 border border-slate-100 ml-10">
                    <div className="text-[18px] font-bold">
                        <span className="text-amber-500!">Boshlangan vaqt: </span>
                        <strong>{moreInfo.startDate}</strong>
                    </div>
                    <div className="text-[18px] font-bold">
                        <span className="text-amber-500!">Tugash vaqt: </span>
                        <strong>{moreInfo.endDate}</strong>
                    </div>
                </div>
            </div>

            <Modal confirmLoading={isPending} onOk={() => DeleteStack()} okText="O'chirish" cancelText="Bekor qilish" open={delModal} onCancel={() => setDelModal(false)} title="O'chirmoqchimisiz?" okButtonProps={{ className: "!bg-amber-600 hover:bg-amber-500!" }} cancelButtonProps={{ className: "hover:border-amber-500! hover:text-amber-600!" }} centered></Modal>
            <Modal confirmLoading={enrollLoading} onOk={handleEnrollSubmit} okText="Qo'shish" cancelText="Bekor qilish" open={enrollModal} onCancel={() => { setEnrollModal(false); setStudentId(null) }} title="Guruhga o'quvchi qo'shish" okButtonProps={{ className: "!bg-amber-600 hover:bg-amber-500!" }} cancelButtonProps={{ className: "hover:border-amber-500! hover:text-amber-600!" }} centered >
                <div className="flex flex-col gap-4 my-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-amber-500! pl-1">O'quvchi tanlang:</span>
                        <CustomSelect extraClass="w-full!" URL="/students" placeholder="O'quvchi tanlang" queryKey={QueryPATH.students} setValue={setStudentId} value={studentId} />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-amber-500! pl-1">Status tanlang:</span>
                        <Select value={enrollStatus} onChange={setEnrollStatus} size="large" className="w-full! text-gray-800!" options={[{ label: "pending", value: "pending" }, { label: "approved", value: "approved" }, { label: "rejected", value: "rejected" },]} />
                    </label>
                </div>
            </Modal>

            <div className="p-5 flex flex-col gap-5 rounded-xl mt-5">
                <Caption title={`${moreInfo.name}/o'quvchilari`} count={moreInfo?.students?.length ?? 0} createPath={`/groups/${id}/create`} />
                <CustomTable loading={isLoading} columns={column} data={moreInfo.students} />
            </div>
        </div>
    )
}

export default GroupsMore