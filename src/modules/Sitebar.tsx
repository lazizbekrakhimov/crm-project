import { PieChartOutlined, BarChartOutlined, UserOutlined, DropboxOutlined, AuditOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from 'antd';
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { LogoIcon } from "../assets/icons";
import { Link } from 'react-router-dom';
import { PATH } from '../components';
import { GetMe } from "../service";
import { useCookies } from "react-cookie";

type MenuItem = Required<MenuProps>['items'][number];

const Sitebar: React.FC = () => {
  const [cookies] = useCookies(['token']);
  const { collapse } = useContext(Context);
  const { data: userInfo = {} } = GetMe(cookies.token);

  const [items, setItems] = useState<MenuItem[]>([
    { key: '1', icon: <PieChartOutlined />, label: <Link to={PATH.stacks}>Yo'nalishlar</Link> },
    { key: '2', icon: <BarChartOutlined />, label: <Link to={PATH.groups}>Guruhlar</Link> },
    { key: '3', icon: <UserOutlined />, label: <Link to={PATH.teachers}>Ustozlar</Link> },
    { key: '4', icon: <TeamOutlined />, label: <Link to={PATH.students}>O'quvchilar</Link> },
    { key: '5', icon: <DropboxOutlined />, label: <Link to={PATH.rooms}>Xonalar</Link> },
  ])

  useEffect(() => {
    if (userInfo.role === "super_admin") {
      const usersData = { key: '6', icon: <AuditOutlined />, label: <Link to={PATH.users}>Foydalanuvchilar</Link> };
      setItems(last => [...last, usersData])
    }
  }, [userInfo]);


  return (
    <div className={`h-screen duration-300 ${collapse ? 'w-[6.5%]' : 'w-[22%]'} bg-linear-to-r from-red-800 to-amber-300 bg-transparent justify-center items-center text-white flex flex-col`}>

      <div className='flex items-center gap-2 p-5 pl-6 border-transparent'>
        {!collapse && <><strong className='text-[26px] font-normal tracking-wide select-none'>Najot </strong></>}
        <LogoIcon />
        {!collapse && <><strong className='text-[26px] font-normal tracking-wide select-none'> Ta'lim</strong></>}
      </div>

      <Menu className='flex-1 p-2! bg-transparent text-white! focus:text-amber-700!' defaultSelectedKeys={['1']} mode='inline' theme='dark' inlineCollapsed={collapse} items={items} style={{ background: 'transparent', color: 'white', fontSize: "17px" }} />

      <div className={`p-5 mt-auto text-mb text-white/80 text-center ${collapse ? 'hidden' : 'block'} select-none`}>
        © 2026 Najot Ta'lim
      </div>
    </div>
  );
};

export default Sitebar;