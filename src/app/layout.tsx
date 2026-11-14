import type {Metadata} from 'next';
import {Shell} from '@/components/Shell';
import './globals.css';
export const metadata:Metadata={title:{default:'Sports Card Atlas｜球盒圖鑑',template:'%s｜Sports Card Atlas'},description:'NBA／MLB 球員卡私人圖鑑，本機預覽。'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-Hant"><body><Shell>{children}</Shell></body></html>;}
