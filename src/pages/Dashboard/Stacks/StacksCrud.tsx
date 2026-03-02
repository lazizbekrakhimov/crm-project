import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import { useEffect, useState, type SubmitEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { QueryPATH } from "../../../components"
import { Create, GetById, Update } from "../../../service"

const StacksCrud = () => {
  const { stackId } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const queryClient = useQueryClient()

  // Create Stacks
  const { mutate: StackCreate, isPending } = Create(cookies.token, "/stacks", navigate, queryClient, QueryPATH.stacks)
  
  // Update
  const { mutate: StackUpdate, isPending: updateLoading } = Update(cookies.token, `/stacks/${stackId}`, navigate, queryClient, QueryPATH.stacksMore, QueryPATH.stacks)
  
  // Submit FN
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = { name, description }
    stackId ? StackUpdate(data) : StackCreate(data)
  }
  
  // Get By Id for Update
  const { data: moreInfo = {} } = stackId ? GetById(stackId, cookies.token, QueryPATH.stacksMore, "/stacks") : {}
  useEffect(() => {
    if (stackId && moreInfo) {
      setName(moreInfo?.name ?? "")
      setDescription(moreInfo?.description ?? "")
    }
  }, [moreInfo])

  return (
    <form onSubmit={handleSubmit} className="p-10">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />} className="hover:border-amber-500 hover:text-amber-600 transition-all" />
        <h1 className="font-bold text-[25px]">Yo'nalish {stackId ? "tahrirlash" : "qo'shish"}</h1>
        <Button loading={stackId ? updateLoading : isPending} className="bg-amber-400!" htmlType="submit" icon={<PlusCircleOutlined />} size="large" type="primary" >
          Saqlash
        </Button>
      </div>
      <div className="flex items-center justify-center gap-10 m-10">
        <label className="flex flex-col w-[40%] gap-1">
          <span className="text-amber-600! pl-1">Yo'nalish nomini kiriting:</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="w-full" allowClear size="large" placeholder="Yo'nalish nomi" />
        </label>
        <label className="flex flex-col w-[40%] gap-1">
          <span className="text-amber-600! pl-1">Kurs haqida ma'lumot kiriting:</span>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" allowClear size="large" placeholder="Kurs haqida" />
        </label>
      </div>
    </form>
  )
}

export default StacksCrud