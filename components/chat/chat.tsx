import { cn } from '@/lib/utils'
import React from 'react'
import ChatHeader from './chat-header'
import ChatBody from './chat-body'
import ChatInput from './chat-input'

interface ChatProps {
    isOpen: boolean,
    onClose: (value: boolean) => void
}

const Chat = ({ isOpen, onClose }: ChatProps) => {

    return (
        <div className={cn(
            "fixed  bottom-0 left-0 w-full h-full max-w-xl max-h-[93vh] bg-white shadow-md rounded-md z-50 transition duration-500 flex flex-col",
            isOpen ? "-translate-x-0 translate-y-0" : "-translate-x-full translate-y-full"
        )}>
            <ChatHeader onClose={onClose} />
            <ChatBody isOpen={isOpen} />
            <ChatInput />
        </div>
    )
}

export default Chat