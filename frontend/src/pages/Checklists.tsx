import React, { useState } from 'react';
import { MdOutlineAddCircle, MdOutlineEdit, MdOutlineDelete, MdOutlineContentCopy } from 'react-icons/md';

interface ChecklistTemplate {
  id: number;
  name: string;
  storeType: string;
  country: string;
  itemCount: number;
  lastUpdated: string;
}

const Checklists = () => {
  const [selectedStoreType, setSelectedStoreType] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Mock data for checklist templates
  const templates: ChecklistTemplate[] = [
    {
      id: 1,
      name: 'Standard Retail Store Opening',
      storeType: 'retail',
      country: 'USA',
      itemCount: 42,
      lastUpdated: '2023-12-15'
    },
    {
      id: 2,
      name: 'Flagship Store Opening',
      storeType: 'flagship',
      country: 'UK',
      itemCount: 78,
      lastUpdated: '2023-11-20'
    },
    {
      id: 3,
      name: 'Pop-up Store Opening',
      storeType: 'popup',
      country: 'Canada',
      itemCount: 28,
      lastUpdated: '2024-01-05'
    },
    {
      id: 4,
      name: 'Mall Kiosk Opening',
      storeType: 'kiosk',
      country: 'Australia',
      itemCount: 22,
      lastUpdated: '2024-02-10'
    },
    {
      id: 5,
      name: 'European Retail Store',
      storeType: 'retail',
      country: 'Germany',
      itemCount: 45,
      lastUpdated: '2024-01-18'
    }
  ];

  // Filter templates based on selected store type and country
  const filteredTemplates = templates.filter(template => 
    (selectedStoreType === 'all' || template.storeType === selectedStoreType) &&
    (selectedCountry === 'all' || template.country === selectedCountry)
  );

  // Store types and countries for filters
  const storeTypes = ['all', 'retail', 'flagship', 'popup', 'kiosk'];
  const countries = ['all', 'USA', 'UK', 'Canada', 'Australia', 'Germany'];

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Store Opening Checklists</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <MdOutlineAddCircle className="text-xl" />
            Create New Template
          </button>
        </div>

        <div className="bg-base-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create a template of checklists and documentation required for a new store opening</h2>
          <p className="mb-4">Customize templates based on store type, country, and specific requirements. Use these templates to ensure consistent and efficient store openings globally.</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Store Type</span>
              </label>
              <select 
                className="select select-bordered" 
                value={selectedStoreType}
                onChange={(e) => setSelectedStoreType(e.target.value)}
              >
                {storeTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select 
                className="select select-bordered" 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Store Type</th>
                <th>Country</th>
                <th>Items</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map(template => (
                <tr key={template.id}>
                  <td>{template.name}</td>
                  <td>
                    <span className="badge badge-outline">
                      {template.storeType.charAt(0).toUpperCase() + template.storeType.slice(1)}
                    </span>
                  </td>
                  <td>{template.country}</td>
                  <td>{template.itemCount} items</td>
                  <td>{template.lastUpdated}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-ghost">
                        <MdOutlineEdit className="text-lg" />
                      </button>
                      <button className="btn btn-sm btn-ghost">
                        <MdOutlineContentCopy className="text-lg" />
                      </button>
                      <button className="btn btn-sm btn-ghost text-error">
                        <MdOutlineDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checklists; 