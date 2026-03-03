import { BellFilled, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Badge, Button, Modal, Popover } from "antd"
import { useContext, useState } from "react"
import { Context } from "../context/Context"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { PATH } from "../components"
import { useCookies } from "react-cookie"
import { GetMe } from "../service"

const Header = () => {
  const [cookies, , removeCookie] = useCookies(["token"])
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { setCollapse, collapse } = useContext(Context)

  const { data: userInfo = {}, isLoading } = GetMe(cookies.token)

  function handleLogOut() {
    setLoading(true)
    setTimeout(() => {
      toast.success("Chiqib ketdingiz!")
      setOpenModal(false)
    }, 1000)
    setTimeout(() => {
      removeCookie("token")
      navigate(PATH.home)
    }, 1800)
  }

  const LogOutContent = (
    <div className="flex flex-col items-center! justify-center gap-2! w-40! h-20! px-4">
      <h1 className="font-mono! text-[18px]!">{userInfo?.fullName}</h1>
      <Button onClick={() => setOpenModal(true)} type="primary" icon={<LogoutOutlined />} className="bg-red-500! text-white! text-[16px]! p-4! hover:bg-red-400! transition-all duration-300 rounded-md flex items-center shadow-sm">Chiqish</Button>
    </div>
  )

  return (
    <div className="sticky top-0 z-10 flex items-center text-5xl justify-between px-6 py-6.75 bg-linear-to-l from-orange-700 to-amber-300">

      <Button onClick={() => setCollapse(!collapse)} type="primary" className="bg-white/90! text-amber-700! hover:bg-gray-100! transition-all duration-500 flex items-center justify-center p-2 rounded-md shadow-none!">
        {collapse ? (
          <MenuFoldOutlined className="text-xl scale-110" />
        ) : (
          <MenuUnfoldOutlined className="text-xl scale-110" />
        )}
      </Button>

      <div className="flex items-center gap-7">
        <Badge count={2} size="small" className="cursor-pointer">
          <BellFilled className="text-white/90! text-2xl hover:text-gray-100! transition-colors duration-300" />
        </Badge>

        <Popover content={LogOutContent}>
          <Button loading={isLoading} type="primary" size="large" className="rounded-[50px]! bg-white/90! text-amber-600! h-10! w-10!">
            {userInfo?.fullName?.split(" ")[0].split("")[0]}
            {userInfo?.fullName?.split(" ")[1].split("")[0]}
          </Button>
        </Popover>
        <Modal open={openModal} onCancel={() => setOpenModal(false)} onOk={handleLogOut} confirmLoading={loading} okText="Chiqish" cancelText="Bekor qilish" okButtonProps={{ className: "!bg-amber-600 hover:bg-amber-500!" }} cancelButtonProps={{ className: "hover:border-amber-500! hover:text-amber-600!" }} title="Chiqish" centered>
          <p className="text-gray-700">Aniq chiqishni hohlaysizmi?</p>
        </Modal>
      </div>
    </div>
  )
}

export default Header