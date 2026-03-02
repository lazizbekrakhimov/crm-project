import { Input } from "antd"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"
import { useState, type FC } from "react"
import { GetAll } from "../../../service"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { debounce } from "../../../hooks"

const Students: FC = () => {
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const columns = [
    { title: "ID", dataIndex: "key" },
    { title: "Ismi", dataIndex: "firstName" },
    { title: "Familiya", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Guruh", dataIndex: "groupName" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Batafsil", dataIndex: "action" },
  ]

  function returnFn(value: any) {
    value.groupName = value?.group?.name ?? "_"
    value.stackName = value?.stack?.name ?? "_"
  }

  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)

  const [stackId, setStackId] = useState<number | null>(null)
  const [teacherId, setTeacherId] = useState<number | null>(null)

  const { data: students = [], isPending } = GetAll(QueryPATH.students, [name, stackId, teacherId], cookies.token, "/students", { name, stackId, teacherId }, navigate, returnFn)

  return (
    <div className="p-5 rounded-tl-3xl border-t-transparent border-l-transparent bg-white">
      <Caption title="O'quvchilar" count={students.length} />
      <div className="flex items-center justify-between my-5! mx-5! mb-10!">
        <Input onChange={(e) => setSearch(e.target.value)} className="w-80!" size="large" allowClear placeholder="Qidirish..." />
        <CustomSelect placeholder="Yo'nalish tanlang" URL="/stacks" queryKey={QueryPATH.stacks} setValue={setStackId} value={stackId} />
        <CustomSelect placeholder="Ustoz tanlang" URL="/teachers" queryKey={QueryPATH.teachers} setValue={setTeacherId} value={teacherId} />
      </div>
      <CustomTable loading={isPending} columns={columns} data={students} />
    </div>
  )
}

export default Students