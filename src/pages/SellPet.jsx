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
  console.log(userData)

  const petOptions = {
    Dog: ['Labrador', 'Pug', 'Beagle', 'German Shepherd', 'shih tzu', 'rottweiler'],
    Cat: ['Persian', 'Siamese', 'Indian Billi (Indigenous Cat)', 'Himalayan', 'Bengal', 'British Shorthair'],
  };
  const [type, setType] = useState(post?.Type || "Dog");
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
    setValue("type", postData.Type);
    setValue("breed", postData.breed);
    setValue("gender", postData.Gender);
    setValue("age", postData.age);
    setValue("sellerNumber", postData.phone);
    setValue("location", postData.location);
    setValue("Price", postData.Price);
    setValue("adopt", postData.adopt);
    setType(postData.Type);
    setIsAdopt(postData.adopt);
  };

  useEffect(() => {
    if (type) {
      setBreeds(petOptions[type] || []);
    }
  }, [type]);

  const [isAdopt, setIsAdopt] = useState(post?.adopt === true);

  const handleAdoptChange = (e) => {
    const adoptValue = e.target.checked ? "true" : "false";
    setIsAdopt(e.target.checked);
    setValue("adopt", adoptValue);
    if (e.target.checked) {
      setValue("Price", "0");
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data) => {
    setIsLoading(true);
    console.log("Form data:", data);
    try {
      // File upload logic
      let petImageFile = null;
      let medicalImageFile = null;

      if (data.petImage && data.petImage[0]) {
        try {
          petImageFile = await service.uploadFile(data.petImage[0]);
          console.log("Pet image uploaded successfully:", petImageFile);
        } catch (error) {
          console.error("Error uploading pet image:", error);
          throw new Error("Failed to upload pet image");
        }
      }

      if (data.medicalImage && data.medicalImage[0]) {
        try {
          medicalImageFile = await service.uploadFile(data.medicalImage[0]);
          console.log("Medical image uploaded successfully:", medicalImageFile);
        } catch (error) {
          console.error("Error uploading medical image:", error);
          throw new Error("Failed to upload medical image");
        }
      }

      console.log("Uploaded files:", { petImageFile, medicalImageFile });

      const postData = {
        type: data.type,
        breed: data.breed,
        petImage: petImageFile ? petImageFile.$id : post?.petImage,
        medicalImage: medicalImageFile ? medicalImageFile.$id : post?.medicalImage,
        sellerName: userData.name,
        location: data.location,
        age: data.age,
        sellerNumber: data.sellerNumber,
        adopt: data.adopt === "true",
        status: "active",
        userId: userData.$id,
        Price: data.adopt === "true" ? "0" : data.Price,
        gender: data.gender,
        postDate: new Date().toISOString(),
      };

      console.log("Post data:", postData);

      let dbPost;
      if (post) {
        // Update existing post
        if (petImageFile && post.petImage) {
          console.log("Deleting old pet image");
          await service.deleteFile(post.petImage);
        }
        if (medicalImageFile && post.medicalImage) {
          console.log("Deleting old medical image");
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
    <div className="min-h-screen bg-gradient-to-br from-[#C499F3] via-[#F2AFEF] to-[#7360DF] p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-[#7360DF] mb-8">
          {post ? "Update Your Pet Listing" : "Sell Your Pet"}
        </h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          {/* Type Dropdown */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Pet Type</label>
            <select
              {...register("type", { required: true })}
              onChange={(e) => {
                setType(e.target.value);
                setValue("type", e.target.value);
                setValue("breed", "");
              }}
              className="mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF] w-full px-4 py-2"
            >
              {Object.keys(petOptions).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Breed Dropdown */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Breed</label>
            <select
              {...register("breed", { required: true })}
              className="mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF] w-full px-4 py-2"
            >
              <option value="">Select a breed</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>

          {/* Pet Image Input */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Pet Image</label>
            <Input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("petImage", { required: !post })}
              className="mt-2 border border-[#C499F3] rounded-lg"
            />
            {post?.petImage && (
              <div className="mt-2">
                <img
                  src={service.getFilePreview(post.petImage)}
                  alt="Pet Image"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Medical Image Input */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Medical Image</label>
            <Input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("medicalImage", { required: !post })}
              className="mt-2 border border-[#C499F3] rounded-lg"
            />
            {post?.medicalImage && (
              <div className="mt-2">
                <img
                  src={service.getFilePreview(post.medicalImage)}
                  alt="Medical Image"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Seller Name Input */}
          {/* <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Seller Name</label>
            <Input
              type="text"
              {...register("sellerName", { required: true })}
              className="mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF]"
            />
          </div> */}

          {/* Location Dropdown */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Location</label>
            <select
              {...register("location", { required: true })}
              className="mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF] w-full px-4 py-2"
            >
              <option value="">Select a location</option>
              {locationOptions.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Age Input */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Age (in weeks)</label>
            <Input
              type="number"
              {...register("age", { required: true })}
              className="mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF]"
            />
          </div>

          {/* Seller Number Input */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Seller Number</label>
            <Input
              type="tel"
              {...register("sellerNumber", { required: true })}
              maxLength="10"
              pattern="\d{10}"
              className="mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF]"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="flex flex-col mb-4">
            <label className="text-lg font-semibold text-gray-700">Gender</label>
            <select
              {...register("gender", { required: true })}
              className="mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF] w-full px-4 py-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Price and Adopt Checkbox */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold text-gray-700">Price</label>
              <Input
                type="number"
                {...register("Price", { required: !isAdopt })}
                disabled={isAdopt}
                className={`mt-2 border border-[#C499F3] rounded-lg shadow-sm focus:ring-2 focus:ring-[#7360DF] ${
                  isAdopt ? 'bg-gray-100' : ''
                }`}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("adopt")}
                checked={isAdopt}
                onChange={handleAdoptChange}
                className="mr-2 h-5 w-5 text-[#7360DF] border-[#C499F3] rounded focus:ring-2 focus:ring-[#7360DF]"
              />
              <label className="text-lg text-gray-700">Adopt</label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7360DF] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-[#C499F3] transition disabled:opacity-50"
          >
            {isLoading ? "Processing..." : (post ? "Update" : "Submit")}
          </button>
        </form>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7360DF]"></div>
              <p className="mt-4 text-lg font-semibold text-[#7360DF]">Processing your request...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellPet;
