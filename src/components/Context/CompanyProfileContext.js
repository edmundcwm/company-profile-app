import React, { createContext, useState } from 'react';

export const CompanyProfileContext = createContext();

export function CompanyProfileProvider(props) {
  const [profileData, setProfileData] = useState([]);
  return (
    <CompanyProfileContext.Provider value={{ profileData, setProfileData }}>
      {props.children}
    </CompanyProfileContext.Provider>
  );
}
