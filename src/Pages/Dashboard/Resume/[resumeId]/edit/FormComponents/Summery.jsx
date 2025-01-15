import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { chatSession } from '../../../../../../../service/AiModel';

function Summery({ enableNext }) {
    const prompt = `Job title: {jobTitle}. Provide a JSON response with the following structure:
{
    "experience_levels": [
        { "level": "fresher", "summary": "..." },
        { "level": "mid-level", "summary": "..." },
        { "level": "experienced", "summary": "..." }
    ]
}
Ensure the response strictly adheres to this structure, and avoid adding any additional text or formatting.`;  
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState('');
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery,
            });
        }
        console.log('Resume ID:', params?.documentId);
    }, [summery]);

    const generateSummary = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
        try {
            const result = await chatSession.sendMessage(PROMPT);
            const parsedResponse = JSON.parse(await result.response.text());
            if (parsedResponse?.experience_levels && Array.isArray(parsedResponse.experience_levels)) {
                setAiGeneratedSummeryList(parsedResponse.experience_levels);
            } else {
                console.error("Expected 'experience_levels' array but got:", parsedResponse);
                setAiGeneratedSummeryList([]);
            }
        } catch (error) {
            console.error("Error parsing AI response:", error);
            setAiGeneratedSummeryList([]);
        }
        setLoading(false);
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: { summery: summery },
        };
        GlobalApi.UpdateResumeDetail(params?.documentId, data).then(
            (resp) => {
                console.log('Resume ID:', params?.documentId);
                enableNext(true);
                setLoading(false);
            },
            (error) => {
                setLoading(false);
            }
        );
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Summary</h2>
                <p>Add Summary For Your Job Title</p>

                <form className="mt-7" onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <label>Add Summary</label>
                        <Button
                            variant="outline"
                            className="border-primary text-primary"
                            size="sm"
                            onClick={generateSummary}
                        >
                            Generate From AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5"
                        onChange={(e) => setSummery(e.target.value)}
                        required
                    />
                    <div className="mt-2 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
            {aiGeneratedSummeryList.length > 0 && (
                <div>
                    <h2 className="font-bold text-lg">Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div key={index}>
                            {console.log(Array.isArray(aiGeneratedSummeryList))} 
                            <h2 className="font-bold my-1">
                                Level: {item?.level}
                            </h2>
                            <p>{item?.summary}</p>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summery;