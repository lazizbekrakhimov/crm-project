import { PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const Caption = ({ title, count, createPath }: { title: string, count: number, createPath?: string }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between p-5">
            <div>
                <h1 className="font-bold text-[25px]">{title}</h1>
                <span className="">{title.toLowerCase()} ({count})</span>
            </div>
            <Button onClick={() => navigate(createPath ?? 'create')} className="bg-amber-500! hover:bg-amber-400!" icon={<PlusCircleOutlined />} size="large" type="primary">Yaratish</Button>
        </div>
    )
}

export default Caption