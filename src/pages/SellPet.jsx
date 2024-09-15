import React, { useEffect, useState } from "react";
import { ID } from "appwrite";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";

function SellPet() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const { register, handleSubmit, watch, setValue, getValues } = useForm();

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData.$id)

  const petOptions = {
    Dog: ['Labrador', 'Pug', 'Beagle', 'German Shepherd', 'Shih Tzu', 'Rottweiler'],
    Cat: ['Persian', 'Siamese', 'Indian Billi (Indigenous Cat)', 'Himalayan', 'Bengal', 'British Shorthair'],
  };
  const [type, setType] = useState(post?.type || "Dog");
  const [breeds, setBreeds] = useState(petOptions[type]);
  const locationOptions = ["Ahmedabad", "Gandhinagar", "Rajkot", "Surat", "Vadodara"];

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
          setDefaultValues(fetchedPost);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate]);

  const setDefaultValues = (postData) => {
    setValue("type", postData.type);
    setValue("breed", postData.breed);
    setValue("gender", postData.gender);
    setValue("age", postData.age);
    setValue("sellerNumber", postData.sellerNumber);
    setValue("location", postData.location);
    setValue("Price", postData.Price);
    setValue("adopt", postData.adopt);
    setType(postData.type);
    setIsAdopt(postData.adopt);
  };

  useEffect(() => {
    if (type) {
      setBreeds(petOptions[type] || []);
    }
  }, [type]);

  const [isAdopt, setIsAdopt] = useState(post?.adopt || false);

  const handleAdoptChange = (e) => {
    const isChecked = e.target.checked;
    setIsAdopt(isChecked);
    setValue("adopt", isChecked);
    if (isChecked) {
      setValue("Price", 0);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data) => {
    setIsLoading(true);
    console.log("Form data:", data);
    try {
      // File upload logic
      let file1 = null;
      let file2 = null;

      if (data.image1 && data.image1[0]) {
        try {
          file1 = await service.uploadFile(data.image1[0]);
          console.log("Pet image uploaded successfully:", file1);
        } catch (error) {
          console.error("Error uploading pet image:", error);
          throw new Error("Failed to upload pet image");
        }
      }

      if (data.image2 && data.image2[0]) {
        try {
          file2 = await service.uploadFile(data.image2[0]);
          console.log("Vaccination image uploaded successfully:", file2);
        } catch (error) {
          console.error("Error uploading vaccination image:", error);
          throw new Error("Failed to upload vaccination image");
        }
      }

      console.log("Uploaded files:", { file1, file2 });

      const postData = {
        type: data.type,
        breed: data.breed,
        gender: data.gender,
        age: data.age,
        petImage: file1 ? file1.$id : post?.petImage,
        medicalImage: file2 ? file2.$id : post?.medicalImage,
        sellerNumber: data.sellerNumber,
        location: data.location,
        Price: data.adopt ? 0 : data.Price,
        status: "active",
        adopt: data.adopt,
        userId: userData.$id,
        sellerName: userData.name,
        postDate: post ? post.postDate : new Date().toISOString(),
      };

      console.log("Post data:", postData);

      let dbPost;
      if (post) {
        // Update existing post
        if (file1 && post.petImage) {
          console.log("Deleting old pet image");
          await service.deleteFile(post.petImage);
        }
        if (file2 && post.medicalImage) {
          console.log("Deleting old vaccination image");
          await service.deleteFile(post.medicalImage);
        }

        console.log("Updating post");
        dbPost = await service.updatePost(post.$id, postData);
      } else {
        // Create new post
        console.log("Creating new post");
        dbPost = await service.createPost({
          ...postData,
          slug: ID.unique(),
        });
      }

      console.log("DB Post result:", dbPost);

      if (dbPost) {
        console.log("Navigating to post page");
        navigate(`/post/${dbPost.$id}`);
      } else {
        throw new Error("Failed to create/update post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert(error.message || "An error occurred while submitting the post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8]">
      {/* Header */}
      <div className="relative w-full overflow-hidden h-80 md:h-96 lg:h-[28rem]">
        <img
          src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Sell Pet Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            {post ? "Update Your Pet Listing" : "Find a New Home for Your Pet"}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-[#7360DF] text-center">
            {post ? "Update Your Pet Listing" : "Sell Your Pet"}
          </h2>
          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type Dropdown */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Pet Type</label>
                <select
                  {...register("type", { required: true })}
                  onChange={(e) => {
                    setType(e.target.value);
                    setValue("type", e.target.value);
                    setValue("breed", "");
                  }}
                  className="form-select rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {Object.keys(petOptions).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Breed Dropdown */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Breed</label>
                <select
                  {...register("breed", { required: true })}
                  className="form-select rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select a breed</option>
                  {breeds.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Location</label>
                <select
                  {...register("location", { required: true })}
                  className="form-select rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select a location</option>
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Age Input */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Age (in weeks)</label>
                <Input
                  type="number"
                  {...register("age", { 
                    required: true,
                    valueAsNumber: true,
                    validate: (value) => Number.isInteger(value) && value > 0
                  })}
                  min="1"
                  step="1"
                  className="form-input rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              {/* Contact Number Input */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Contact Number</label>
                <Input
                  type="tel"
                  {...register("sellerNumber", { required: true })}
                  maxLength="10"
                  pattern="\d{10}"
                  className="form-input rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              {/* Gender Dropdown */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  {...register("gender", { required: true })}
                  className="form-select rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Image Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pet Image Input */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Pet Image</label>
                <Input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image1", { required: !post })}
                  className="form-input rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {post?.petImage && (
                  <img
                    src={service.getFilePreview(post.petImage)}
                    alt="Pet Image"
                    className="mt-2 w-full h-auto rounded-lg shadow-sm"
                  />
                )}
              </div>

              {/* Vaccination Image Input */}
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">Vaccination Image</label>
                <Input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image2", { required: !post })}
                  className="form-input rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {post?.medicalImage && (
                  <img
                    src={service.getFilePreview(post.medicalImage)}
                    alt="Vaccination Image"
                    className="mt-2 w-full h-auto rounded-lg shadow-sm"
                  />
                )}
              </div>
            </div>

            {/* Price and Adopt Checkbox */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="text-lg font-semibold text-gray-700 mb-2">Price</label>
                <Input
                  type="number"
                  {...register("Price", { 
                    required: !isAdopt,
                    min: 0,
                    valueAsNumber: true,
                    validate: (value) => !isAdopt || value === 0
                  })}
                  disabled={isAdopt}
                  className={`form-input rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    isAdopt ? 'bg-gray-100' : ''
                  }`}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("adopt", {
                    onChange: handleAdoptChange
                  })}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                />
                <label className="ml-2 text-lg text-gray-700">Adopt</label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7360DF] text-white py-3 rounded-md font-semibold shadow-md hover:bg-opacity-90 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#C499F3] disabled:opacity-50"
            >
              {isLoading ? "Processing..." : (post ? "Update Listing" : "Create Listing")}
            </button>
          </form>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7360DF]"></div>
            <p className="mt-4 text-lg font-semibold text-[#7360DF]">Processing your request...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellPet;
