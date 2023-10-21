"use client"
import { farmerAssistantChat } from '@/data'
import React, { useEffect, useRef } from 'react'
import ChatMessage from './chat-message'

const ChatBody = ({ isOpen }: { isOpen: boolean }) => {

    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!bottomRef.current) {
            return;
        }

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        })

    }, [isOpen])

    return (
        <div className='flex flex-col flex-1 w-full h-full overflow-y-auto hide-scrollbar'>
            {
                farmerAssistantChat.map((chat) => (
                    <ChatMessage
                        key={chat.id}
                        data={chat}
                    />
                ))
            }
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatBody