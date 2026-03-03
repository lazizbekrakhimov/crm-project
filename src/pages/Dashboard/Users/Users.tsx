import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const Users = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-160 gap-6">
      <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-amber-500 animate-spin" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[28px] font-black text-amber-500">Sahifa jarayonda...</h1>
        <p className="text-gray-500 text-[18px]">Foydalanuvchilar bo'limi tez orada ishga tushuriladi!</p>
        <Button onClick={() => navigate(-1)} className="mt-4! px-6! py-5! rounded-xl! text-gray-500! hover:border-amber-500! hover:text-amber-500! transition-all! duration-300!" >
        Orqaga qaytish
      </Button>
      </div>
    </div>
  )
}

export default Users