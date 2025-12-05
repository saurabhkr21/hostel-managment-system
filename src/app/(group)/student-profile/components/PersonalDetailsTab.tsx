'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PersonalDetails {
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  guardianName: string;
  guardianPhone: string;
  medicalConditions: string;
  allergies: string;
  medications: string;
}

interface PersonalDetailsTabProps {
  details: PersonalDetails;
}

const PersonalDetailsTab = ({ details }: PersonalDetailsTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PersonalDetails>(details);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: keyof PersonalDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    // In real app, would update the parent component's state
  };

  const handleCancel = () => {
    setFormData(details);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            <Icon name="PencilIcon" size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors duration-200"
            >
              <Icon name="XMarkIcon" size={16} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-md hover:bg-success/90 transition-colors duration-200 disabled:opacity-50"
            >
              <Icon name={isSaving ? "ArrowPathIcon" : "CheckIcon"} size={16} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="UserIcon" size={20} />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-text-secondary">{formData.dateOfBirth}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Blood Group</label>
            {isEditing ? (
              <select
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p className="text-text-secondary">{formData.bloodGroup}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="MapPinIcon" size={20} />
          Address Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Address</label>
            {isEditing ? (
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-text-secondary">{formData.address}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">City</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">State</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.state}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Pincode</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.pincode}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="UsersIcon" size={20} />
          Guardian Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Parent Details</h4>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Parent Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.parentName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Parent Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.parentPhone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Parent Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.parentEmail}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Guardian Details</h4>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Guardian Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={(e) => handleInputChange('guardianName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.guardianName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Guardian Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <p className="text-text-secondary">{formData.guardianPhone}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="HeartIcon" size={20} />
          Medical Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Medical Conditions</label>
            {isEditing ? (
              <textarea
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                rows={3}
                placeholder="List any medical conditions or write 'None'"
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-text-secondary">{formData.medicalConditions || 'None'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Allergies</label>
            {isEditing ? (
              <textarea
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                rows={2}
                placeholder="List any allergies or write 'None'"
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-text-secondary">{formData.allergies || 'None'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Current Medications</label>
            {isEditing ? (
              <textarea
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                rows={2}
                placeholder="List current medications or write 'None'"
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-text-secondary">{formData.medications || 'None'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;