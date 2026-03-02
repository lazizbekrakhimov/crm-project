import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState, type SubmitEvent } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Create, GetById, Update } from "../../../service"
import { CustomSelect, QueryPATH } from "../../../components"
import { Button, Input } from "antd"
import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons"

const TeachersCrud = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const queryClient = useQueryClient()

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [stackId, setStackId] = useState<number | null>(null)

  // Create Teacher
  const { mutate: TeacherCreate, isPending: createLoading } = Create(cookies.token, "/teachers", navigate, queryClient, QueryPATH.teachers)

  // Update Teacher
  const { mutate: TeacherUpdate, isPending: updateLoading } = Update(cookies.token, `/teachers/${id}`, navigate, queryClient, QueryPATH.teachersMore, QueryPATH.teachers)

  // Submit
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data: any = { firstName, lastName, email, phone, stackId }
    if (!id || password) data.password = password
    id ? TeacherUpdate(data) : TeacherCreate(data)
  }

  // Get By Id for Update
  const { data: moreInfo = {} } = id ? GetById(id, cookies.token, QueryPATH.teachersMore, "/teachers") : {}

  useEffect(() => {
    if (moreInfo && id) {
      setFirstName(moreInfo.firstName)
      setLastName(moreInfo.lastName)
      setEmail(moreInfo.email)
      setPhone(moreInfo.phone)
      setStackId(moreInfo.stackId)
    }
  }, [moreInfo])

  return (
    <form onSubmit={handleSubmit} className="p-10 px-10!">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate(-1)} type="dashed" icon={<ArrowLeftOutlined />} className="hover:border-amber-500 hover:text-amber-600 transition-all" />
        <h1 className="font-bold text-[25px]"> Ustoz {id ? "tahrirlash" : "qo'shish"} </h1>
        <Button loading={id ? updateLoading : createLoading} htmlType="submit" icon={<PlusCircleOutlined />} size="large" type="primary" > Saqlash </Button>
      </div>
      <div className="flex items-center justify-center gap-10 m-10">
        <div className="w-[45%] flex flex-col gap-3">
          <label className="flex flex-col w-full! gap-1">
            <span className="text-amber-500! pl-1">Ism kiriting:</span>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full" allowClear size="large" placeholder="Ism" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-amber-500! pl-1">Familiya kiriting:</span>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full" allowClear size="large" placeholder="Familiya" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-amber-500! pl-1">Email kiriting:</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" allowClear size="large" placeholder="Email" type="email" />
          </label>
        </div>
        <div className="w-[45%] flex flex-col gap-3">
          <label className="flex flex-col w-full! gap-1">
            <span className="text-amber-500! pl-1">Telefon raqam kiriting:</span>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" allowClear size="large" placeholder="+998901112233" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-amber-500! pl-1">
              Parol {id ? "(o'zgartirish uchun kiriting)" : "kiriting"}:
            </span>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" allowClear size="large" placeholder="Parol" />
          </label>
          <label className="flex flex-col w-full! gap-1">
            <span className="text-amber-500! pl-1">Yo'nalish tanlang:</span>
            <CustomSelect extraClass="w-full!" URL="/stacks" placeholder="Yo'nalish tanlang" queryKey={QueryPATH.stacks} setValue={setStackId} value={stackId} />
          </label>
        </div>
      </div>
    </form>
  )
}

export default TeachersCrud