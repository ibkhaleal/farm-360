import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { X } from 'lucide-react'

interface ChatHeaderProps {
    onClose: (value: boolean) => void
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
    return (
        <div className='flex items-center w-full gap-3 bg-slate-50 py-2 px-4'>
            <div className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage src='/x.png' />
                </Avatar>
                <h1 className='font-semibold text-lg'>X-Assistant <sub className='font-light'>powered by watsonX.ai</sub></h1>
            </div>
            <X
                onClick={() => onClose(false)}
                className='ml-auto' />

        </div>
    )
}

export default ChatHeader