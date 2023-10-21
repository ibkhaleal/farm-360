"use client"
import { Chat } from '@/types'
import React from 'react'
import { useData } from '../providers/content-provider'
import { Avatar, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
import { isPromise } from 'util/types'

const ChatMessage = ({ data }: { data: Chat }) => {

    const {user} = useData();

    const image = data?.isPrompt ? user?.image : "/x.png"

    return (
        <div className={cn(
            'flex gap-3 py-4 px-5',
            data?.isPrompt ? "bg-slate-100" : "bg-white"
        )}>
            <Avatar>
                <AvatarImage src={image} />
            </Avatar>
            <p dangerouslySetInnerHTML={{__html: data?.body}} />
        </div>
    )
}

export default ChatMessage