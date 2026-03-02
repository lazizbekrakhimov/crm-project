import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById } from "../../../service"
import { QueryPATH } from "../../../components"
import { Button, Modal } from "antd"
import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"

const StudentsMore = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [cookies] = useCookies(['token'])
  const [delModal, setDelModal] = useState<boolean>(false)
  const queryClient = useQueryClient()

  // Student Get By Id
  const { data: moreInfo = {}, isLoading } = GetById(id, cookies.token, QueryPATH.studentsMore, "/students")

  // Student Delete
  const { mutate: DeleteStudent, isPending } = Delete(cookies.token, `/students/${id}`, navigate, queryClient, QueryPATH.students)

  return (
    <div className="p-5 h-screen">
      <div className="flex items-center justify-between p-8 mb-5">
        <div className="flex gap-6 items-center">
          <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />} />
          <h2 className="font-bold text-[25px]">
            {isLoading
              ? "Loading..."
              : `${moreInfo.firstName} ${moreInfo.lastName}`}
          </h2>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setDelModal(true)} className="bg-red-500! hover:bg-red-400!" type="primary" size="large" icon={<DeleteFilled />} />
          <Button onClick={() => navigate("update")} size="large" type="primary" icon={<EditFilled />}>Tahrirlash</Button>
        </div>
      </div>

      <div className="flex justify-center gap-5 mt-5 mx-10">
        <div className="w-[50%] shadow-lg rounded-2xl space-y-3 p-5 border border-slate-500">
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">#ID: </span>
            <strong>{id}</strong>
          </div>
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">Ismi: </span>
            <strong>{moreInfo.firstName}</strong>
          </div>
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">Familiya: </span>
            <strong>{moreInfo.lastName}</strong>
          </div>
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">Email: </span>
            <strong>{moreInfo.email}</strong>
          </div>
        </div>
        <div className="w-[50%] shadow-lg rounded-2xl space-y-4 p-5 border border-slate-500 ml-10">
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">Telefon: </span>
            <strong>{moreInfo.phone}</strong>
          </div>
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">Guruh: </span>
            <strong>{moreInfo?.group?.name ?? "_"}</strong>
          </div>
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">Yo'nalish: </span>
            <strong>{moreInfo?.stack?.name ?? "_"}</strong>
          </div>
          <div className="text-[18px] font-bold">
            <span className="text-amber-500!">Ustoz: </span>
            <strong>
              {moreInfo?.teacher?.firstName} {moreInfo?.teacher?.lastName}
            </strong>
          </div>
        </div>
      </div>
      <Modal confirmLoading={isPending} onOk={() => DeleteStudent()} okText="O'chirish" cancelText="Bekor qilish" open={delModal} onCancel={() => setDelModal(false)} title="O'chirmoqchimisiz?" okButtonProps={{ className: "!bg-amber-600 hover:bg-amber-500!" }} cancelButtonProps={{ className: "hover:border-amber-500! hover:text-amber-600!" }} centered />
    </div>
  )
}

export default StudentsMore