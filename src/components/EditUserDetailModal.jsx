import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

const EditUserDetailModal = ({ isOpen, onClose, userData }) => {
  const initialFormState = {
    name: userData?.name || "",
    email: userData?.email || "",
    phone: "",
    address: "",
    ifscCode: "",
    accountNumber: "",
    branchName: "",
    accountHolderName: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Valid 10-digit phone number is required";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
    if (!formData.accountNumber)
      newErrors.accountNumber = "Account number is required";
    if (!formData.branchName) newErrors.branchName = "Branch name is required";
    if (!formData.accountHolderName)
      newErrors.accountHolderName = "Account holder name is required";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Updated User Details:", formData);
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  if (!isOpen) return null;

  const inputClasses =
    "rounded-md border-gray-300 text-[10px] md:text-sm bg-white text-gray-900 placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-300";

  const errorMessageClasses =
    "text-red-500 text-[8px] md:text-[11px] md:-mt-2 font-medium tracking-tight";

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      style={{
        fontFamily: "ModalFont, sans-serif",
      }}
    >
      <Card className="w-full max-w-xl bg-white rounded-2xl">
        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Edit User Details
              </h2>
              <p className="text-[11px] md:text-sm text-gray-500 mt-1">
                Update your personal information
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="rounded-full h-11 w-11 -mt-1 bg-slate-100 hover:bg-red-500 flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6 text-gray-900" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`${inputClasses} ${
                      errors.name ? "border-red-300" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className={errorMessageClasses}>{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    placeholder="Enter your email"
                    className={`${inputClasses} ${
                      errors.email ? "border-red-300" : ""
                    } bg-gray-200 opacity-50 cursor-not-allowed`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`${inputClasses} ${
                      errors.phone ? "border-red-300" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className={errorMessageClasses}>{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    Address
                  </label>
                  <Textarea
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className={`${inputClasses} ${
                      errors.address ? "border-red-300" : ""
                    }`}
                  />
                  {errors.address && (
                    <p className={errorMessageClasses}>{errors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="">
              <h3 className="text-[11px] md:text-sm font-medium text-gray-900 mb-4">
                Bank Details
                <hr className="my-2 border-gray-300" />
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    IFSC Code
                  </label>
                  <Input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    placeholder="Enter IFSC code"
                    className={`${inputClasses} ${
                      errors.ifscCode ? "border-red-300" : ""
                    }`}
                  />
                  {errors.ifscCode && (
                    <p className={errorMessageClasses}>{errors.ifscCode}</p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    Account Number
                  </label>
                  <Input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    className={`${inputClasses} ${
                      errors.accountNumber ? "border-red-300" : ""
                    }`}
                  />
                  {errors.accountNumber && (
                    <p className={errorMessageClasses}>
                      {errors.accountNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    Branch Name
                  </label>
                  <Input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    placeholder="Enter branch name"
                    className={`${inputClasses} ${
                      errors.branchName ? "border-red-300" : ""
                    }`}
                  />
                  {errors.branchName && (
                    <p className={errorMessageClasses}>{errors.branchName}</p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] md:text-sm font-medium text-gray-900 mb-1.5 block">
                    Account Holder Name
                  </label>
                  <Input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    placeholder="Enter account holder name"
                    className={`${inputClasses} ${
                      errors.accountHolderName ? "border-red-300" : ""
                    }`}
                  />
                  {errors.accountHolderName && (
                    <p className={errorMessageClasses}>
                      {errors.accountHolderName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 rounded-xl py-6 bg-blue-600 hover:bg-blue-800 text-white"
                onClick={handleSubmit}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditUserDetailModal;
