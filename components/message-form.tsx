"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
//import { addMessageToDatabase } from "@/actions/add-message-to-database";

export default function MessageForm() {
    const [message,setMessage]=useState("");

    /*async function handleAddMessageToDatabase(){
        const response=await addMessageToDatabase(message);
        if(response.ok){
            setMessage("");
        }
    }*/

    return (
        <div className="flex flex-col justify-center gap-3">
            <Input
              placeholder="add a message..." 
              value={message}
              onChange={(event)=>setMessage(event.target.value)}
            />
            <Button>Submit</Button>
        </div>
    )
}