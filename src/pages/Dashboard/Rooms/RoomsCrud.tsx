import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState, type SubmitEvent } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Create, GetById, Update, Delete } from "../../../service"
import { QueryPATH } from "../../../components"
import { Button, Input, InputNumber, Modal } from "antd"
import { ArrowLeftOutlined, DeleteFilled, EditFilled, PlusCircleOutlined } from "@ant-design/icons"

const RoomsCrud = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const queryClient = useQueryClient()
  const [delModal, setDelModal] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [capacity, setCapacity] = useState<number | null>(null)

  // Room create
  const { mutate: RoomCreate, isPending: createLoading } = Create(cookies.token, "/rooms", navigate, queryClient, QueryPATH.rooms)

  // Room update
  const { mutate: RoomUpdate, isPending: updateLoading } = Update(cookies.token, `/rooms/${id}`, navigate, queryClient, QueryPATH.roomsMore, QueryPATH.rooms)

  // Room delete
  const { mutate: RoomDelete, isPending: deleteLoading } = Delete(cookies.token, `/rooms/${id}`, navigate, queryClient, QueryPATH.rooms)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = { name, capacity }
    id ? RoomUpdate(data) : RoomCreate(data)
  }

  const { data: moreInfo = {} } = id ? GetById(id, cookies.token, QueryPATH.roomsMore, "/rooms") : {}

  useEffect(() => {
    if (moreInfo && id) {
      setName(moreInfo.name)
      setCapacity(moreInfo.capacity)
    }
  }, [moreInfo])

  return (
    <form onSubmit={handleSubmit} className="p-10">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />} className="hover:border-amber-500 hover:text-amber-600 transition-all" />
        <h1 className="font-bold text-[25px]">Xona {id ? "tahrirlash" : "qo'shish"}</h1>
        {id ? (
          <div className="flex gap-3">
            <Button onClick={() => setDelModal(true)} className="bg-red-500! hover:bg-red-400!" type="primary" size="large" icon={<DeleteFilled />} />
            <Button loading={updateLoading} htmlType="submit" icon={<EditFilled />} size="large" type="primary">Saqlash</Button>
          </div>
        ) : (
          <Button loading={createLoading} htmlType="submit" icon={<PlusCircleOutlined />} size="large" type="primary">Saqlash</Button>
        )}
      </div>
      <div className="flex items-center justify-center gap-10 m-10">
        <label className="flex flex-col w-[40%] gap-1">
          <span className="text-amber-500! pl-1">Xona nomini kiriting:</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="w-full" allowClear size="large" placeholder="Room 101" />
        </label>
        <label className="flex flex-col w-[40%] gap-1">
          <span className="text-amber-500! pl-1">Sig'imini kiriting:</span>
          <InputNumber value={capacity} onChange={(n) => setCapacity(n)} className="w-full! " size="large" placeholder="25" min={1} />
        </label>
      </div>
      <Modal confirmLoading={deleteLoading} onOk={() => RoomDelete()} okText="O'chirish" cancelText="Bekor qilish" open={delModal} onCancel={() => setDelModal(false)} title="O'chirmoqchimisiz?" okButtonProps={{ className: "!bg-amber-600 hover:bg-amber-500!" }} cancelButtonProps={{ className: "hover:border-amber-500! hover:text-amber-600!" }} centered />
    </form>
  )
}
export default RoomsCrud