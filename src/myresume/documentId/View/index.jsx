import Header from '../../../components/Header/Header';
import { Button } from '../../../components/ui/button';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share';
import Previewsection from '../../../Pages/Dashboard/Resume/[resumeId]/edit/Previewsection';
import html2pdf from 'html2pdf.js';

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { documentId } = useParams();
    const pdfRef = useRef();

    useEffect(() => {
        GetResumeInfo();
    }, []);

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(documentId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        });
    };

    const HandleDownload = () => {
        const element = pdfRef.current;
        const options = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generated Resume is ready!
                    </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share the unique 
                        resume URL with your friends and family.</p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume please open the URL to see it",
                                url: import.meta.env.VITE_BASE_URL+ "/myresume/" + documentId + "/view",
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area" ref={pdfRef}>
                    <Previewsection />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
