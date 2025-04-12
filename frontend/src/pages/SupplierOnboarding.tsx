import { useState } from 'react';
import {
  MdOutlineAddBusiness,
  MdOutlineDescription,
  MdOutlineAttachFile,
  MdOutlineCheck,
  MdOutlineClose,
  MdOutlineSchedule,
  MdOutlineWarning,
  MdOutlineInfo,
  MdOutlineArrowForward,
} from 'react-icons/md';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  documents: string[];
  dueDate?: string;
}

const SupplierOnboarding = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    category: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    registrationNumber: '',
  });

  // Mock onboarding steps data
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Company details and contact information',
      status: 'completed',
      documents: [],
    },
    {
      id: 2,
      title: 'Document Submission',
      description: 'Required legal and business documents',
      status: 'in_progress',
      documents: ['business_license.pdf', 'tax_certificate.pdf'],
      dueDate: '2024-03-15',
    },
    {
      id: 3,
      title: 'Compliance Review',
      description: 'Review of compliance and certifications',
      status: 'pending',
      documents: ['compliance_checklist.pdf'],
      dueDate: '2024-03-20',
    },
    {
      id: 4,
      title: 'Financial Assessment',
      description: 'Review of financial stability and credit',
      status: 'pending',
      documents: ['financial_statement.pdf'],
      dueDate: '2024-03-25',
    },
    {
      id: 5,
      title: 'Final Approval',
      description: 'Final review and approval process',
      status: 'pending',
      documents: ['approval_form.pdf'],
      dueDate: '2024-03-30',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const getStatusBadge = (status: OnboardingStep['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
            <MdOutlineCheck /> Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 flex items-center gap-1">
            <MdOutlineSchedule /> In Progress
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
            <MdOutlineClose /> Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 flex items-center gap-1">
            <MdOutlineInfo /> Pending
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MdOutlineAddBusiness className="text-primary" />
          Supplier Onboarding
        </h1>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold">Onboarding Progress</h2>
            <p className="text-gray-500 dark:text-gray-400">Complete all steps to finish the onboarding process</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">2 of 5 steps completed</span>
            <div className="w-32 h-2 bg-base-200 dark:bg-slate-700 rounded-full">
              <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {onboardingSteps.map((step) => (
            <div 
              key={step.id}
              className={`p-4 rounded-lg border ${
                step.status === 'completed' ? 'border-green-500 dark:border-green-700' :
                step.status === 'in_progress' ? 'border-blue-500 dark:border-blue-700' :
                'border-gray-200 dark:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
                {getStatusBadge(step.status)}
              </div>

              {step.documents.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Required Documents:</p>
                  <div className="space-y-2">
                    {step.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <MdOutlineAttachFile className="text-gray-500" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step.dueDate && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <MdOutlineSchedule className="text-gray-500" />
                  <span>Due by: {step.dueDate}</span>
                </div>
              )}

              {step.status === 'in_progress' && (
                <button className="btn btn-primary btn-sm mt-3">
                  Continue <MdOutlineArrowForward />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Basic Information Form */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter business category"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Contact Name</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter contact person name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter business address"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Tax ID</span>
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter tax ID"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Registration Number</span>
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter business registration number"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline">
              Save as Draft
            </button>
            <button type="submit" className="btn btn-primary">
              Submit and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierOnboarding; 