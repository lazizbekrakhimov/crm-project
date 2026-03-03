import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { QueryPATH } from "../../../components"
import { useCookies } from "react-cookie"
import { Delete, GetById } from "../../../service"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import Groups from "../Groups/Groups"

const StacksMore = () => {
  const navigate = useNavigate()
  const { stackId } = useParams()
  const [cookies] = useCookies(['token'])
  const [delModal, setDelModal] = useState<boolean>(false)
  const queryClient = useQueryClient()

  // Stack Get By Id
  const { data: moreInfo = {}, isLoading } = GetById(stackId, cookies.token, QueryPATH.stacksMore, "/stacks")

  // Stack Delete
  const { mutate: DeleteStack, isPending } = Delete(cookies.token, `/stacks/${stackId}`, navigate, queryClient, QueryPATH.stacks)
  return (
    <div className="p-5 h-screen">
      <div className="p-8 rounded-tl-3xl border-t-transparent border-l-transparent bg-white">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-6 items-center">
            <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />} className="hover:border-amber-500 hover:text-amber-600 transition-all" />
            <h2 className="font-extrabold text-[28px]">
              {isLoading ? "Loading ..." : moreInfo.name}
            </h2>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setDelModal(true)} className="bg-red-500! hover:bg-red-400! transition-all" type="primary" size="large" icon={<DeleteFilled />} />
            <Button onClick={() => navigate("update")} className="bg-amber-500! hover:bg-amber-400! transition-all" size="large" type="primary" icon={<EditFilled />} >
              Tahrirlash
            </Button>
          </div>
        </div>

        <div className="w-[60%] mx-auto space-y-4 p-8 rounded-2xl shadow-lg border border-slate-100 bg-white">
          <div className="text-[18px] font-semibold">
            <span className="text-amber-600">ID: </span>
            <strong>{stackId}</strong>
          </div>
          <div className="text-[18px] font-semibold">
            <span className="text-amber-600">Nomi: </span>
            <strong>{moreInfo.name}</strong>
          </div>
          <div className="text-[18px] font-semibold">
            <span className="text-amber-600">Ma'lumot: </span>
            <strong>{moreInfo.description}</strong>
          </div>
          <div className="text-[18px] font-semibold">
            <span className="text-amber-600">Yaratilgan vaqt: </span>
            <strong>{moreInfo.createdAt}</strong>
          </div>
          <div className="text-[18px] font-semibold">
            <span className="text-amber-600">O'zgartirilgan vaqt: </span>
            <strong>{moreInfo.updatedAt}</strong>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-5 rounded-xl mt-5">
        <Modal confirmLoading={isPending} onOk={() => DeleteStack()} okText="O'chirish" cancelText="Bekor qilish" open={delModal} onCancel={() => setDelModal(false)} title="O'chirmoqchimisiz?" okButtonProps={{ className: "!bg-amber-600 hover:bg-amber-500!" }} cancelButtonProps={{ className: "hover:border-amber-500! hover:text-amber-600!" }} centered></Modal>
        <Groups stackPropId={Number(stackId)} title={`${moreInfo.name}/guruhlar`} />
      </div>
    </div>
  )
}

export default StacksMore