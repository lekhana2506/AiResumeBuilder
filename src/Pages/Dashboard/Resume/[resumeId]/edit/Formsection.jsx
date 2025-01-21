import React from 'react'
import PersonalDetail from './FormComponents/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRightCircle, LayoutGrid } from 'lucide-react'
import { useState } from 'react'
import Summery from './FormComponents/Summery'
import Experience from './../edit/FormComponents/Experience'
import Education from './FormComponents/Education'
import Skills from './FormComponents/Skills'
import { Navigate, useParams } from 'react-router-dom'
import Certificate from '../edit/FormComponents/Certificate'


function Formsection() {
  const [activeFormIndex, setActiveFormIndex]=useState(1)
  const [enableNext,setEnableNext]=useState(true)
  const {documentId}=useParams()
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant='outline' size='sm' className='flex gap-2'><LayoutGrid/>Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex>1&&<Button size='sm' onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
          <Button disabled={!enableNext} className='flex gap-2' size='sm' onClick={()=>setActiveFormIndex(activeFormIndex+1)}>Next<ArrowRightCircle/></Button>
        </div>
      </div>
      {activeFormIndex==1? 
      < PersonalDetail enableNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==2?< Summery enableNext={(v)=>setEnableNext(v)}/>:activeFormIndex==3?<Experience/>:activeFormIndex==4?<Education/>:activeFormIndex==5?<Skills/>:activeFormIndex==6?<Certificate/>:activeFormIndex==7?<Navigate to={'/myresume/'+documentId+"/View"}/>:null}

    </div>
  )
}

export default Formsection