"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SendHorizonal } from 'lucide-react'


const formSchema = z.object({
    input: z.string().min(1, {
        message: "Enter any prompt"
    })
})

const ChatInput = () => {

    const [isLoading, setIsLoading] = useState(false)


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div className='w-full px-3'>
            <Form {...form}>
                <div className="py-2 pb-4 flex gap-3 w-full">
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        className="bg-gray-100 dark:bg-slate-900/50 border-0 focus-visible:ring-0 text-black dark:text-slate-200 focus-visible:ring-offset-0 w-full"
                                        placeholder="send a message"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="dark:text-rose-500" />
                            </FormItem>
                        )}
                    />
                    <Button 
                    variant="primary"
                    disabled={form?.getValues("input")?.length === 0}
                    className='px-2 disabled:opacity-50'
                    >
                        <SendHorizonal />
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ChatInput