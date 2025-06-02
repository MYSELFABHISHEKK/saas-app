"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { subjects } from "@/constants"
import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, { message: "Companion is required." }),
    subject: z.string().min(1, { message: "Subject is required." }),
    topic: z.string().min(1, { message: "Topic is required." }),
    voice: z.string().min(1, { message: "Voice is required." }),
    style: z.string().min(1, { message: "Style is required." }),
    duration: z.coerce.number().min(1, { message: "Duration is required." }),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
 const companion = await createCompanion(values);
 if(companion) {
     redirect(`/companions/${companion.id}`);
 } else {
     console.log('Failed to create companion');
     redirect(`/`);

 }
    }

    return (
        <Form {...form}>
            <div className="max-w-xl mx-auto mt-4 px-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Companion Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Companion name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter the companion name"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Subject */}
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full capitalize">
                                            <SelectValue placeholder="Select the subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem
                                                    value={subject}
                                                    key={subject}
                                                    className="capitalize"
                                                >
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Topic */}
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What should the companion help with?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Ex. Derivatives & Integrals"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Voice */}
                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Voice</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select the voice" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Style */}
                    <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Style</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select the style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="formal">Formal</SelectItem>
                                            <SelectItem value="casual">Casual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Duration */}
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estimated session duration in minutes</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="15"
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button type="submit" className="w-full">
                        Build Your Companion
                    </Button>
                </form>
            </div>
        </Form>
    )
}

export default CompanionForm
