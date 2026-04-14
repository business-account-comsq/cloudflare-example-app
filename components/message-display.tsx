"use client";
import { deleteMessageToDatabase } from "@/actions/delete-message-from-database";
import { Button } from "./ui/button";

type Message = {
    id: number;
    message: string;
}

type Props = {
    messages: Message[];
}

export default function MessageDisplay({ messages }: Props) {
    async function handleDeleteMessageToDatabase(id:number) {
        await deleteMessageToDatabase(id);
    }
    return (
        <div className="p-5">
            <ul>
                {messages.map((message) => {
                    return <li key={message.id}>{message.message}<Button variant={"destructive"} onClick={()=>handleDeleteMessageToDatabase(message.id)}>削除</Button></li>
                })}
            </ul>
        </div>
    )
}