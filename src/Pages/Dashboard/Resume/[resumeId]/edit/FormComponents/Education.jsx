import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import TextEditor from '@/components/TextEditor/TextEditor'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../../service/GlobalApi'

function Education() {

  const [educationList, setEducationList]=useState([
    {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
    }
  ])
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  const {documentId}=useParams()

  const handleChange=(index,event)=>{
    const newEntries=educationList.slice()
    const {name,value}=event.target
    newEntries[index][name]=value
    setEducationList(newEntries)
}

const AddMoreEducation=()=>{
        setEducationList([...educationList,{
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }])
    }

    const RemoveEducation=()=>{
        setEducationList(exp=>exp.slice(0,-1))
    }

    const handleTextEditor=(e,name,index)=>{
        const newEntries=educationList.slice()
        newEntries[index][name]=e.target.value
        setEducationList(newEntries)
    }

     useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationList
        })
        },[educationList])

const onSave=(e)=>{
        const data={
            data:{
                education:educationList
            }
        }
        GlobalApi.UpdateResumeDetail(documentId,data).then(resp=>{
            console.log('Resume ID:', documentId);
        }
        )
        
    }



  return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Information About Your Education</p>
            <div>
            {educationList.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label className='text-xs'>University Name</label>
                            <Input name='universityName' onChange={(e)=>handleChange(index,e)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Degree</label>
                            <Input name='degree' onChange={(e)=>handleChange(index,e)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Major</label>
                            <Input name='major' onChange={(e)=>handleChange(index,e)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type='date'name='startDate' onChange={(e)=>handleChange(index,e)}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type='date'name='endDate' onChange={(e)=>handleChange(index,e)}/>
                        </div>
                        <div className='col-span-2'>
                        <label className='text-xs'>Description</label>
                        <Textarea name='description'onChange={(e)=>handleChange(index,e)}/>
                        </div>
                        
                    </div>

                </div>
            ))}
            </div>
            <div className='flex justify-between'>
                        <div className='flex gap-2'>
                        <Button variant='outline'className='text-primary' onClick={AddMoreEducation}> + Add More Education</Button>
                        <Button variant='outline'className='text-primary' onClick={RemoveEducation}> - Remove Education</Button>
                        </div>
                        <Button onClick={()=>onSave()}>Save</Button>
            </div>
        </div>
  )
}

export default Education