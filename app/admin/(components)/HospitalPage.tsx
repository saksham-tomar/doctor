"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Hospital, Phone, MapPin, Ambulance, Bed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FileUpload from "@/app/(GlobalComponents)/dnd";
import { createHospital } from "@/app/lib/addHospital";

const HospitalRegistrationForm = () => {
  interface FormData {
    hospitalName: string;
    hospitalAddress: string;
    hospitalPhone: string;
    hospitalImage: string;
    ambulanceCount: string | number;
    bedCount: string | number;
  }

  const [formData, setFormData] = useState<FormData>({
    hospitalName: "",
    hospitalAddress: "",
    hospitalPhone: "",
    hospitalImage: "",
    ambulanceCount: "",
    bedCount: "",
  });
  const [image, setImage] = useState<string>();

  const handleInputChange = (e: HTMLFormElement | any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: HTMLFormElement | any) => {
    e.preventDefault();
    const submittedData = {
      ...formData,
      image,
    };
    createHospital(submittedData);
    console.log("Form submitted:", submittedData);
  };

  const handleFileUpload = (file: string) => {
    setImage((prev) => (prev = file));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center ">
            <div className="py-4 mb-6 border px-40 rounded-lg border-gray-300">
              <FileUpload onFileUpload={handleFileUpload} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-300 to-green-300 text-transparent bg-clip-text">
            Hospital Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="hospitalName"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Hospital className="w-5 h-5 mr-2 text-blue-500" />
                Hospital Name
              </label>
              <Input
                id="hospitalName"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="hospitalAddress"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <MapPin className="w-5 h-5 mr-2 text-green-500" />
                Hospital Address
              </label>
              <Input
                id="hospitalAddress"
                name="hospitalAddress"
                value={formData.hospitalAddress}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-300 focus:border-green-300"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="hospitalPhone"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Phone className="w-5 h-5 mr-2 text-blue-500" />
                Hospital Phone
              </label>
              <Input
                id="hospitalPhone"
                name="hospitalPhone"
                type="tel"
                value={formData.hospitalPhone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="hospitalImage"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Hospital Image URL
              </label>
              <Input
                id="hospitalImage"
                name="hospitalImage"
                type="url"
                value={formData.hospitalImage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-300 focus:border-green-300"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="ambulanceCount"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Ambulance className="w-5 h-5 mr-2 text-blue-500" />
                  Ambulance Count
                </label>
                <Input
                  id="ambulanceCount"
                  name="ambulanceCount"
                  type="number"
                  min="0"
                  value={formData.ambulanceCount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
              </div>

              <div className="flex-1 space-y-2">
                <label
                  htmlFor="bedCount"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Bed className="w-5 h-5 mr-2 text-green-500" />
                  Bed Count
                </label>
                <Input
                  id="bedCount"
                  name="bedCount"
                  type="number"
                  min="0"
                  value={formData.bedCount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-300 focus:border-green-300"
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-300 to-green-300 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-green-300 transition-colors duration-300"
              >
                Register Hospital
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HospitalRegistrationForm;
