import { Input } from "antd"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"
import { useState, type FC } from "react"
import { GetAll } from "../../../service"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { debounce } from "../../../hooks"

interface GroupType {
  title: string,
  stackPropId?: number | null
}

const Groups: FC<GroupType> = ({ title, stackPropId }) => {
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  const columns = [
    { title: "ID", dataIndex: "key" },
    { title: "Nomi", dataIndex: "name" },
    { title: "Yo'nalish nomi", dataIndex: "stackName" },
    { title: "Ustoz", dataIndex: "teacherName" },
    { title: "Holat", dataIndex: "status" },
    { title: "Batafsil", dataIndex: "action" },
  ]

  function returnFn(value: any) {
    value.stackName = value.stack ? value?.stack?.name : "_"
    value.teacherName = `${value?.teacher?.firstName} ${value?.teacher?.lastName}`
  }

  // Search
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)

  // Stack Filter
  const [stackId, setStackId] = useState<number | null>(stackPropId ? stackPropId : null)

  // Filter Teacher
  const [teacherId, setTeacherId] = useState<number | null>(null)

  // Get All
  const { data: groups = [], isPending } = GetAll(QueryPATH.groups, [name, stackId, teacherId], cookies.token, "/groups", { name, stackId, teacherId }, navigate, returnFn)
  return (
    <div className="p-5 rounded-tl-3xl border-t-transparent border-l-transparent bg-white">
      <Caption title={title} count={groups.length} />
      <div className="flex items-center justify-between my-5! mx-5! mb-10!">
        <Input onChange={(e) => setSearch(e.target.value)} className="w-80!" size="large" allowClear placeholder="Qidirish..." />
        <CustomSelect disabled={stackPropId ? true : false} placeholder="Yo'nalish tanlang" URL="/stacks" queryKey={QueryPATH.stacks} setValue={setStackId} value={stackId} />
        <CustomSelect params={stackPropId ? { stackId: stackPropId } : {}} placeholder="Ustoz tanlang" URL="/teachers" queryKey={QueryPATH.teachers} setValue={setTeacherId} value={teacherId} />
      </div>
      <CustomTable loading={isPending} columns={columns} data={groups} />
    </div>
  )
}

export default Groups