import React, { useEffect, useState } from 'react';
import AddResume from './AddResume';
import GlobalApi from '../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import Resumeitem from '@/components/ResumeItem/Resumeitem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]); // Initialize with an empty array

  const GetResumeList = () => {
    const emailAddress = user?.primaryEmailAddress?.emailAddress;

    if (!emailAddress) {
      console.error('Email address is undefined');
      return;
    }

    GlobalApi.GetUserResumes(emailAddress)
      .then((resp) => {
        console.log('API Response:', resp.data);
        // Safely access nested data or fallback to an empty array
        const resumes = resp.data?.data || [];
        setResumeList(resumes);
      })
      .catch((err) => {
        console.error('Error fetching resumes:', err);
        setResumeList([]); // Reset to empty array on error
      });
  };

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating an AI-generated resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {Array.isArray(resumeList) && resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <Resumeitem resume={resume} key={index} />
          ))
        ) : (
          <p>No resumes found. Please add one!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
