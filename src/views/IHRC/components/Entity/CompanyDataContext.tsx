
import React, { createContext, useState, useContext, useEffect } from 'react';

interface CompanyGroup {
  id: string;
  name: string;
}

interface Company {
  id: string;
  name: string;
  groupId: string;
}

interface CompanyDataContextType {
  companyGroups: CompanyGroup[];
  companies: Company[];
  updateCompanyGroup: (id: string, newName: string) => void;
  addCompanyGroup: (name: string) => void;
  deleteCompanyGroup: (id: string) => void;
  addCompany: (name: string, groupId: string) => void;
  deleteCompany: (id: string) => void;
}

const CompanyDataContext = createContext<CompanyDataContextType | undefined>(undefined);

export const CompanyDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyGroups, setCompanyGroups] = useState<CompanyGroup[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedGroups = localStorage.getItem('companyGroups');
    const storedCompanies = localStorage.getItem('companies');
    if (storedGroups) setCompanyGroups(JSON.parse(storedGroups));
    if (storedCompanies) setCompanies(JSON.parse(storedCompanies));
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem('companyGroups', JSON.stringify(companyGroups));
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companyGroups, companies]);

  const updateCompanyGroup = (id: string, newName: string) => {
    setCompanyGroups(groups => groups.map(group => 
      group.id === id ? { ...group, name: newName } : group
    ));
  };

  const addCompanyGroup = (name: string) => {
    const newGroup: CompanyGroup = { id: Date.now().toString(), name };
    setCompanyGroups(groups => [...groups, newGroup]);
  };

  const deleteCompanyGroup = (id: string) => {
    setCompanyGroups(groups => groups.filter(group => group.id !== id));
    setCompanies(companies => companies.filter(company => company.groupId !== id));
  };

  const addCompany = (name: string, groupId: string) => {
    const newCompany: Company = { id: Date.now().toString(), name, groupId };
    setCompanies(companies => [...companies, newCompany]);
  };

  const deleteCompany = (id: string) => {
    setCompanies(companies => companies.filter(company => company.id !== id));
  };

  return (
    <CompanyDataContext.Provider value={{
      companyGroups,
      companies,
      updateCompanyGroup,
      addCompanyGroup,
      deleteCompanyGroup,
      addCompany,
      deleteCompany,
    }}>
      {children}
    </CompanyDataContext.Provider>
  );
};

export const useCompanyData = () => {
  const context = useContext(CompanyDataContext);
  if (context === undefined) {
    throw new Error('useCompanyData must be used within a CompanyDataProvider');
  }
  return context;
};