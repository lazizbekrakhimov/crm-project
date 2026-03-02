import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../hooks';
import { toast } from "react-hot-toast"
import { useCookies } from "react-cookie"
import { useNavigate } from 'react-router-dom';
import PATH from './Path';
import QueryPATH from './QueryPath';

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [, setCookie,] = useCookies(['token']);
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (body: { email: string, password: string }) => instance().post("/auth/login", body),
    onSuccess: (res) => {
      toast.success("Muvaffaqiyatli kirdinggiz!")
      setCookie("token", res.data.data.tokens.accessToken)
      navigate(PATH.home)
      queryClient.removeQueries({ queryKey: [QueryPATH.me] })
    },
    onError: (err) => toast.error(err.message)
  })
  const onFinish = (values: { email: string, password: string }) => mutate(values)
  return (
    <div className="h-screen">
      <Form className="m-20" name="login" autoComplete="off" initialValues={{ remember: true }} style={{ maxWidth: 400 }} onFinish={onFinish} >
        <h1 className="font-bold text-[28px] text-[#161616] my-10">Tizimga kirish</h1>

        <Form.Item className="mb-8" name="email" rules={[{ required: true, message: "To'ldirish shart" }]} >
          <div>
            <p className="text-[16px] mb-2">
              <span className="text-red-600">*</span> Login
            </p>
            <Input allowClear size="large" prefix={<UserOutlined />} placeholder="Login kiriting" className="!focus:border-amber-500 hover:border-amber-500!" />
          </div>
        </Form.Item>

        <Form.Item className="mb-8" name="password" rules={[{ required: true, message: "To'ldirish shart" }]} >
          <div>
            <p className="text-[16px] mb-2">
              <span className="text-red-600">*</span> Parol
            </p>
            <Input.Password size="large" prefix={<LockOutlined />} type="password" placeholder="Parol kiriting" className="!focus:border-amber-500 hover:border-amber-500!" />
          </div>
        </Form.Item>

        <Button loading={isPending} className="bg-amber-500! hover:bg-amber-400! !hover:bg-[#006400] font-bold mt-4" size="large" block type="primary" htmlType="submit" >
          Kirish
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;