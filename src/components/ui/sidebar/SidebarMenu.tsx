'use client';
import Link from 'next/link'

interface Props{
  href: string
  icon: React.ReactNode
  text: string
  onClick?: () => void;
  isVisible?: boolean;
}

export const SidebarMenu = ({ href, icon, text, onClick, isVisible = true  }:Props) => {

  return (
    <div onClick={onClick} className='cursor-pointer' hidden={!isVisible}>
      <Link
        href={ href }
        className='flex items-center my-5 p-2 hover:bg-[linear-gradient(to_bottom_right,#94A3B8,#737373,#404040)] hover:text-slate-100 rounded transition-all'
      >
        { icon }
        <span className='ml-3 text-xl'>{ text }</span>
      </Link>
    </div>
  )
}
