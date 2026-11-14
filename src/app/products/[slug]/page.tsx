import {Wall} from '@/components/Wall';
export default async function Page({params}:{params:Promise<{slug:string}>}){return <Wall slug={(await params).slug}/>;}
