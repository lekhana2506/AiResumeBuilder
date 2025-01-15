import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formsection from './Formsection';
import Previewsection from './Previewsection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from '../../../../../../service/GlobalApi';

function EditResume() {
    const { documentId } = useParams();
    console.log(documentId)
    const [resumeInfo, setResumeInfo] = useState(dummy); // Default value
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetResumeInfo();
    }, []); // Dependency array includes `id`
    const GetResumeInfo = () => {
        setLoading(true);
        GlobalApi.GetResumeById(documentId)
            .then(resp => {
                console.log(resp.data.data);
                setResumeInfo(resp.data.data); // Update state
            })
            .catch(error => {
                console.error("Error fetching resume info:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>; // Loading indicator
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
                <Formsection />
                <Previewsection />
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;
