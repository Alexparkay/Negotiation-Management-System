import React, { useState } from 'react';
import { MdOutlineSave, MdOutlineCancel, MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineAttachMoney, MdOutlineCategory, MdOutlinePerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NewStore = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: 'USA',
    openingDate: '',
    size: '',
    budget: '',
    manager: '',
    storeType: 'retail',
    description: ''
  });

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'China', 'India'];
  const storeTypes = ['retail', 'flagship', 'popup', 'kiosk', 'outlet'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Store created successfully!');
    
    // Navigate to stores page
    navigate('/stores');
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Add New Store</h1>
        </div>

        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Store Name*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MdOutlineCategory className="text-gray-500" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter store name"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Location*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MdOutlineLocationOn className="text-gray-500" />
                  </span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Country */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Country*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Opening Date */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Opening Date*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MdOutlineCalendarToday className="text-gray-500" />
                  </span>
                  <input
                    type="date"
                    name="openingDate"
                    value={formData.openingDate}
                    onChange={handleChange}
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Store Size */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Store Size (sq ft)*</span>
                </label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Enter store size"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Budget */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Budget (USD)*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MdOutlineAttachMoney className="text-gray-500" />
                  </span>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter budget"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Store Manager */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Store Manager*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MdOutlinePerson className="text-gray-500" />
                  </span>
                  <input
                    type="text"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    placeholder="Enter manager name"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Store Type */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Store Type*</span>
                </label>
                <select
                  name="storeType"
                  value={formData.storeType}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  {storeTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter store description"
                className="textarea textarea-bordered w-full h-32"
              />
            </div>

            {/* Template Selection */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Checklist Template</span>
              </label>
              <div className="bg-base-100 p-4 rounded-lg">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center">
                    <input type="radio" name="template" className="radio radio-primary mr-2" checked />
                    <div>
                      <p className="font-medium">Standard Retail Store Opening</p>
                      <p className="text-xs opacity-70">42 tasks - Suitable for standard retail locations</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="template" className="radio radio-primary mr-2" />
                    <div>
                      <p className="font-medium">Flagship Store Opening</p>
                      <p className="text-xs opacity-70">78 tasks - Comprehensive checklist for flagship stores</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="template" className="radio radio-primary mr-2" />
                    <div>
                      <p className="font-medium">Pop-up Store Opening</p>
                      <p className="text-xs opacity-70">28 tasks - Streamlined for temporary locations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate('/stores')}
                className="btn btn-outline gap-2"
              >
                <MdOutlineCancel className="text-xl" />
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary gap-2"
              >
                <MdOutlineSave className="text-xl" />
                Create Store
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStore; 