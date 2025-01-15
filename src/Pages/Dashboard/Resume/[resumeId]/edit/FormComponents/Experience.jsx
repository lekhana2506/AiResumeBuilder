import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import TextEditor from '@/components/TextEditor/TextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../../service/GlobalApi'

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
}

function Experience() {
    const [experienceList, setExperienceList] = useState([formField])
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params=useParams()
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperienceList(resumeInfo?.experience)
        
    },[])

    // Handle form field changes
    const handleChange=(index,event)=>{
        const newEntries=experienceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        console.log(newEntries)
        setExperienceList(newEntries);
    }


    // Add new experience form
    const AddNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }]) // Spread the formField to ensure fresh object
    }

    // Remove last experience form
    const RemoveExperience = () => {
        if (experienceList.length > 1) {
            setExperienceList(experienceList.slice(0, -1))
        }
    }

    // Handle text editor change
    const handleTextEditor = (e, name, index) => {
        const newEntries = [...experienceList] // Deep copy
        newEntries[index][name] = e.target.value
        setExperienceList(newEntries)
    }

    // Update the resume info whenever experience list changes
    useEffect(() => {
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            experience: experienceList,
        }));
    }, [experienceList]);

    // Save data (e.g., to API or local storage)
    const onSave = () => {
        const data = {
            data: {
                experience: experienceList
            }
        }
        console.log("Saving data: ", data)
        // Do the save operation here (API call, etc.)

        GlobalApi.UpdateResumeDetail(params?.documentId,data).then(res=>{
            console.log(res);
            setLoading(false);
        },(error)=>{
            setLoading(false);
        })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Information About Your Past Work Experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Title</label>
                                    <Input
                                        name='title'
                                        value={item.title}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input
                                        name='companyName'
                                        value={item.companyName}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input
                                        name='city'
                                        value={item.city}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input
                                        name='state'
                                        value={item.state}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                        type='date'
                                        name='startDate'
                                        value={item.startDate}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                        type='date'
                                        name='endDate'
                                        value={item.endDate}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>

                                <div className='col-span-2'>
                                    <TextEditor
                                        index={index}
                                        value={item.workSummary}
                                        onTextEditorChange={(event) => handleTextEditor(event, 'workSummary', index)}
                                    />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant='outline' className='text-primary' onClick={AddNewExperience}> + Add More Experience</Button>
                        <Button variant='outline' className='text-primary' onClick={RemoveExperience}> - Remove Experience</Button>
                    </div>

                    <Button onClick={onSave}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default Experience
