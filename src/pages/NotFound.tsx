import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-160 gap-4">
      <h1 className="text-[120px] font-black text-amber-400 leading-none">404</h1>
      <p className="text-[20px] text-gray-400">Uzr, bunday sahifa topilmadi!</p>
      <Button onClick={() => navigate(-1)} className="mt-4! px-6! py-5! rounded-xl! text-gray-500! hover:border-amber-400! hover:text-amber-400! transition-all! duration-300!" >
        Orqaga qaytish
      </Button>
    </div>
  )
}

export default NotFound