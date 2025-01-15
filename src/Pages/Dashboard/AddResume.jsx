import { PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from '../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function AddResume() {
    const[openDialog,setOpenDialog]=useState(false)
    const[resumeTitle,setResumeTitle]=useState()
    const {user}=useUser()
    const[loading,setLoading]=useState(false)
    const navigation=useNavigate()

    const onCreate=async()=>{
        setLoading(true)
        const uuid=uuidv4();
        const data={
            data:{
                Title:resumeTitle,
                resumeid:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName,
            }
        }

        GlobalApi.CreateNewResume(data).then(resp=>{
            console.log(resp)
            if(resp){
                setLoading(false)
                console.log(resp.data.data)
                navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit')
            }
        },(error)=>{
            setLoading(false)
        })
    }

    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] w-[250px] hover: scale-105 transition-all hover:shadow-md cursor-pointer' onClick={()=>setOpenDialog(true)}>
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add Title</p>
                            <Input className='my-2' placeholder='Ex: Full Stack Developer' onChange={(e)=>setResumeTitle(e.target.value)}/>
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                        <Button className='bg-secondary text-black hover:text-white' varient='ghost' onClick={()=>setOpenDialog(false)} >Cancel</Button>
                        <Button varient='ghost' onClick={async()=>onCreate()} disabled={!resumeTitle||loading}>Create</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume