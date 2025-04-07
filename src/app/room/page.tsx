"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/user-context"
import { useState } from "react"

interface NewRoom {
  name: string;
  description:string;
}

const RoomPage = () => {
const { user, client} = useUser();
  const [newRoom,setNewRoom] = useState<NewRoom>({name:"", description:""})

  const createRoom = async () => {
const {name,description} = newRoom
if (!client || !user || !name || !description) return;

const call  = client.call("audio_room",name);
await call.join({
  create:true,
  data: {
    members: [{user_id: user.username}],
    custom: {
      title:name,
      description,
    }
  }
})
  }
  
  return (
    <div>
       <div className="flex flex-col justify-center items-center">
    <h1 className="text-5xl font-semibold pt-10 pb-10 bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">Welcome to LittleSpace</h1>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Your Own Room</DialogTitle>
          <DialogDescription>
           Add Details for your room. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Room Name
            </Label>
            <Input
              id="name"
              defaultValue="AI Agents"
              className="col-span-3"
              onChange={(event:React.ChangeEvent<HTMLInputElement>) =>
                 setNewRoom((prev) => ({...prev, name:event.target.value}))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="username"
              defaultValue="Pros and Cons of AI Agents"
              className="col-span-3"
              onChange={(event:React.ChangeEvent<HTMLInputElement>) =>
                setNewRoom((prev) => ({...prev, description:event.target.value}))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    </div>
    </div>
   
  )
}

export default RoomPage