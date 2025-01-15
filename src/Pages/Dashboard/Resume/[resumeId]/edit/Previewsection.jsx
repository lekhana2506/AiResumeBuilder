import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import Personaldetails from './PreviewComponents/Personaldetails'
import Summary from './PreviewComponents/Summary'
import Experience from './PreviewComponents/Experience'
import Education from './PreviewComponents/Education'
import Skills from './PreviewComponents/Skills'

function Previewsection() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{
        borderColor: resumeInfo?.themeColor
    }}>
        <Personaldetails resumeInfo={resumeInfo}/>
        <Summary resumeInfo={resumeInfo}/>
        <Experience resumeInfo={resumeInfo}/>
        <Education resumeInfo={resumeInfo}/>
        <Skills resumeInfo={resumeInfo}/>
    </div>
  )
}

export default Previewsection