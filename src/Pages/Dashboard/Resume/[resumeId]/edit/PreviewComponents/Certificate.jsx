import React from 'react';

function CertificatePreview({ resumeInfo }) {
  // Safely access the Certificate property
  const certificates = resumeInfo?.Certificate || []; // Default to an empty array if undefined

  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Courses and Certifications
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {certificates.length > 0 ? ( // Use the safe certificates array here
        certificates.map((certificate, index) => (
          <div key={index} className='my-5 flex justify-between items-center'>
            <div className='flex-1'>
              <h2
                className='text-sm font-bold'
                style={{ color: resumeInfo.themeColor }}
              >
                {certificate.Title}
              </h2>
              {certificate.organization && (
                <p className='text-xs'>
                  <strong>Organization:</strong> {certificate.organization}
                </p>
              )}
              {certificate.issueDate && (
                <p className='text-xs'>
                  <strong>Issue Date:</strong> {certificate.issueDate}
                </p>
              )}
              {certificate.description && (
                <p className='text-xs'>
                  <strong>Description:</strong> {certificate.description}
                </p>
              )}
            </div>
            {certificate.Link && (  // Check if Link is filled
              <a
                href={certificate.Link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-xs text-blue-500 underline ml-3'
              >
                Link
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No certificates added yet. Please add some in the form section.</p>
      )}
    </div>
  );
}

export default CertificatePreview;
