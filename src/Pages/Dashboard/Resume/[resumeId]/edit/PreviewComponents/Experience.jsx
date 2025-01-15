import exp from 'constants'
import React from 'react'

function Experience({resumeInfo}) {
  return (
    <div className='my-6 '>
        <h2 className='text-center font-bold text-sm mb-2' style={{
            color:resumeInfo?.themeColor
        }}>Professional Experience</h2>
        <hr style={{borderColor:resumeInfo?.themeColor}}/>
        {
            resumeInfo?.experience.map((experience,index)=>(
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold' style={{color:resumeInfo.themeColor}}>{experience?.title}</h2>
                    <h2 className='text-xs flex justify-between'>{experience?.companyName},
                        {experience?.city},
                        {experience?.state}
                        <span>{experience?.startDate} {experience?.currentlyWorking?'Present':experience.endDate}</span></h2>
                    <p>{experience.linkName && experience.linkUrl && (
        <a href={experience.linkUrl} target="_blank" rel="noopener noreferrer">
          {experience.linkName}
        </a>
      )}</p>
                    <div>
                        <p className='text-xs'>{experience.workSummary}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Experience