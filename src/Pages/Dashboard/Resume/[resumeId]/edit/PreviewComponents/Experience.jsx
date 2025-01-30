import dayjs from 'dayjs';
import React from 'react';

function Experience({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor || '#000' }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor || '#000' }} />
      {resumeInfo?.experience?.length > 0 ? (
        resumeInfo.experience.map((experience, index) => (
          <div key={index} className="my-5">
            <h2
              className="text-sm font-bold"
              style={{ color: resumeInfo?.themeColor || '#000' }}
            >
              {experience?.title}
            </h2>
            <h2 className="text-xs flex justify-between">
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span>
                {dayjs(experience?.startDate).format('MMM YYYY')} -{' '}
                {experience?.currentlyWorking
                  ? 'Present'
                  : dayjs(experience?.endDate).format('MMM YYYY')}
              </span>
            </h2>
            {experience?.linkName && experience?.linkUrl && (
              <p>
                <a
                  href={experience.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: resumeInfo?.themeColor || '#000' }}
                >
                  {experience.linkName}
                </a>
              </p>
            )}
            <div>
              <p className="text-xs">{experience?.workSummary}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-center">No experience added yet.</p>
      )}
    </div>
  );
}

export default Experience;
