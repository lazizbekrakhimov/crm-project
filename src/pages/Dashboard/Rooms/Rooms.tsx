import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { Input, Button } from "antd"
import { EditFilled } from "@ant-design/icons"
import { Caption, CustomTable, QueryPATH } from "../../../components"
import { GetAll } from "../../../service"
import { debounce } from "../../../hooks"

const Rooms = () => {
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)

  // Rooms Get All
  const { data: rooms = [], isPending } = GetAll(QueryPATH.rooms, [name], cookies.token, "/rooms", { name }, navigate)

  const columns = [
    { title: "ID", dataIndex: "key" },
    { title: "Nomi", dataIndex: "name" },
    { title: "Sig'im", dataIndex: "capacity" },
    { title: "Tahrirlash", dataIndex: "actions", render: (_: any, record: any) => (<Button size="medium" className="" type="primary" icon={<EditFilled />} onClick={() => navigate(`/rooms/${record.id}/update`)} ></Button>) },
  ]

  return (
    <div className="p-5 rounded-tl-3xl border-t-transparent border-l-transparent bg-white">
      <Caption title="Xonalar" count={rooms.length} />
      <Input onChange={(e) => setSearch(e.target.value)} className="w-80! m-5 mb-10!" size="large" placeholder="Qidirish..." allowClear />
      <CustomTable loading={isPending} columns={columns} data={rooms} />
    </div>
  )
}

export default Rooms