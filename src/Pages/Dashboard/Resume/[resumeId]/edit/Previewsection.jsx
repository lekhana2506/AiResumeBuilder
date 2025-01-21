import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import Personaldetails from './PreviewComponents/Personaldetails';
import Summary from './PreviewComponents/Summary';
import Experience from './PreviewComponents/Experience';
import Education from './PreviewComponents/Education';
import Skills from './PreviewComponents/Skills';
import CertificatePreview from './PreviewComponents/Certificate';
import html2pdf from 'html2pdf.js';

function Previewsection() {
    const { resumeInfo } = useContext(ResumeInfoContext);

    const handleDownloadPDF = () => {
        const element = document.getElementById('preview-section');
        html2pdf().from(element).save('resume.pdf');
    };

    return (
        <div>
            <div id="preview-section" className='shadow-lg h-full p-14 border-t-[20px]' style={{ borderColor: resumeInfo?.themeColor }}>
                <Personaldetails resumeInfo={resumeInfo} />
                <Summary resumeInfo={resumeInfo} />
                <Experience resumeInfo={resumeInfo} />
                <Education resumeInfo={resumeInfo} />
                <Skills resumeInfo={resumeInfo} />
                <CertificatePreview resumeInfo={resumeInfo} />
            </div>
        </div>
    );
}

export default Previewsection;
