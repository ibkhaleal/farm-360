"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { useData } from "../providers/content-provider"
import { useUser } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import { Input } from "../ui/input"


const formSchema = z.object({
    mobile: z.string().min(10, {
        message: "Enter Mobile Number"
    }),
    type: z.string().min(1, {
        message: "Select your account type"
    }),
    address: z.string().min(3, {
        message: "Input your default address"
    }),
})


const InitialModal = () => {

    const [isMounted, setIsMounted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const { user, setUser, isLoading: isLoadingUser } = useData();
    const { user: clerkUser } = useUser();

    useEffect(() => {
        setIsMounted(true)
    }, [])

    
    const accountTypes = [
        {
            value: 1,
            name: "User/Farmer"
        },
        {
            value: 2,
            name: "Warehouse"
        },
        {
            value: 3,
            name: "Tools Lender"
        }
    ]



    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mobile: clerkUser?.phoneNumbers[0]?.phoneNumber || "",
            type: "",
            address: ""
        }
    })


    if (user && !user?.error) {
        router.push("/main")
    }

    if (isLoadingUser || !user?.error || !isMounted) {
        // console.log(isMounted, "MUTED", isLoadingUser, " || Is loading || ", user?.error, "ERROR");
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-teal-700/80" />
            </div>
        )
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsSubmitting(true)
            const apiUrl = 'https://asibiti.ng/farm360/api/register.php';
            const userData = {
                name: `${clerkUser?.firstName} ${clerkUser?.lastName}`,
                clerkId: clerkUser?.id,
                phone: values.mobile,
                email: clerkUser?.emailAddresses[0]?.emailAddress,
                image: clerkUser?.imageUrl,
                address: values?.address,
                utype: values?.type
            };

            // Send a POST request to the endpoint with the user data
            const axios = require('axios');
            let data = JSON.stringify(userData);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: apiUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response: any) => {
                    const data = response.data;
                    if (data?.id) {
                        setUser(data);
                        router.push("/main");
                    }
                    console.log(JSON.stringify(data));
                })
                .catch((error: any) => {
                    console.log(error);
                });
                setIsSubmitting(false)
        } catch (error) {
            // Handle request errors or other exceptions
            console.error('Error:', error);
        }
    }


    // if (!isMounted) {
    //     return null
    // }



    return (
        <Dialog open>
            <DialogContent
                className="bg-white dark:bg-zinc-800 text-black dark:text-zinc-300 p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Select account type
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                         <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=
                                            "uppercase text-sm font-bold text-slate-500 dark:text-slate-400 w-full flex">Mobile Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                className="bg-gray-100 dark:bg-slate-900/50 border-0 focus-visible:ring-0 text-black dark:text-slate-200 focus-visible:ring-offset-0"
                                                placeholder="+123456789"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="dark:text-rose-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=
                                            "uppercase text-sm font-bold text-zinc-500 dark:text-zinc-400 w-full flex">
                                            Type
                                        </FormLabel>
                                        <Select
                                            disabled={isSubmitting}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-100 dark:bg-zinc-900/50 border-0 focus:ring-0 text-black dark:text-zinc-200 ring-offset-0 focus:ring-offset-0 capitalize outline-none flex">
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    accountTypes.map((type, i) => {

                                                        return (
                                                            <SelectItem
                                                                key={i}
                                                                value={type.value.toString()}
                                                                className="capitalize"
                                                            >
                                                                {type.name}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="dark:text-rose-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=
                                            "uppercase text-sm font-bold text-slate-500 dark:text-slate-400 w-full flex">Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isSubmitting}
                                                className="bg-gray-100 dark:bg-slate-900/50 border-0 focus-visible:ring-0 text-black dark:text-slate-200 focus-visible:ring-offset-0"
                                                placeholder={"address"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="dark:text-rose-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-zinc-100 dark:bg-zinc-900/50 px-6 py-4">
                            <Button
                                disabled={isSubmitting}
                                variant="primary"
                            >
                                Proceed
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default InitialModal