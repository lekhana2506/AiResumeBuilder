import React, { useState, useEffect, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'react-router-dom';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../../../../service/GlobalApi';

function Certificate() {
    const [certificateList, setCertificateList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { documentId } = useParams();

    useEffect(() => {
        // Initialize certificateList with existing data from resumeInfo
        if (resumeInfo?.Certificate && resumeInfo.Certificate.length > 0) {
            setCertificateList(resumeInfo.Certificate);
        }
    }, [resumeInfo]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedList = [...certificateList];
        updatedList[index][name] = value;
        setCertificateList(updatedList);
    };

    const AddMoreCertificate = () => {
        setCertificateList((prev) => [
            ...prev,
            { Title: '', organization: '', issueDate: '', description: '', Link: '' },
        ]);
    };

    const RemoveCertificate = () => {
        setCertificateList((prev) => prev.slice(0, -1));
    };

    useEffect(() => {
        // Update the context state whenever certificateList changes
        setResumeInfo((prev) => ({
            ...prev,
            Certificate: certificateList,
        }));
    }, [certificateList, setResumeInfo]);

    const onSave = () => {
        const data = {
            data: {
                Certificate: certificateList,
            },
        };

        GlobalApi.UpdateResumeDetail(documentId, data)
            .then((response) => {
                console.log('Resume updated successfully:', response);
            })
            .catch((error) => {
                console.error('Error updating resume:', error);
            });
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Certificates</h2>
            <p>Add Information About Your Certificates</p>
            {certificateList.length > 0 ? (
                <div>
                    {certificateList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div className="col-span-2">
                                    <label className="text-xs">Certificate Title</label>
                                    <Input
                                        name="Title"
                                        value={item.Title}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Certificate Title"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs">Organization</label>
                                    <Input
                                        name="organization"
                                        value={item.organization}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Issuing Organization"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Issue Date</label>
                                    <Input
                                        type="date"
                                        name="issueDate"
                                        value={item.issueDate}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs">Description</label>
                                    <Textarea
                                        name="description"
                                        value={item.description}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Description of the certificate"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs">Certificate Link</label>
                                    <Input
                                        name="Link"
                                        value={item.Link}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Link to the certificate"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No certificates added yet. Please add some.</p>
            )}
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" className="text-primary" onClick={AddMoreCertificate}>
                        + Add More Certificates
                    </Button>
                    <Button variant="outline" className="text-primary" onClick={RemoveCertificate}>
                        - Remove Certificates
                    </Button>
                </div>
                <Button onClick={onSave}>Save</Button>
            </div>
        </div>
    );
}

export default Certificate;
