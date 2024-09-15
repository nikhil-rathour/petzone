import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
      // console.log(conf.appwriteUrl, conf.appwriteProjectId, conf.appwriteBucketId , conf.appwritePetsCollectionId, conf.appwriteDatabaseId)
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  

  async createPost({
    type,
    breed,
    gender,
    age,
    petImage,
    slug,
    postDate,
    medicalImage,
    sellerName,
    sellerNumber,
    location,
    Price,
    status,
    adopt,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
       
        conf.appwriteDatabaseId,
        conf.appwritePetsCollectionId,
        slug,
        {
          type,
          breed,
          gender,
          age,
          petImage,
          postDate,
          medicalImage,
          sellerName,
          sellerNumber,
          location,
          Price,
          status,
          adopt,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      throw error; // Propagate the error
    }
  }

  async updatePost(
    slug,
    {
          type,
          breed,
          gender,
          age,
          petImage,
          postDate,
          medicalImage,
          sellerNumber,
          location,
          Price,
          adopt,
          status,
    }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePetsCollectionId,
        slug,
        {
          type,
          breed,
          gender,
          age,
          petImage,
          postDate,
          medicalImage,
          sellerNumber,
          location,
          Price,
          adopt,
          status,
        }
      )
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      throw error; // Propagate the error
    }
  }

 
  
  

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePetsCollectionId,
        slug
      )
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePetsCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePetsCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  async createStory({userId,story,status}){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteStoryCollectionId,
        ID.unique(),
        {
          userId,
          story,
          status,
        }
      )
    } catch (error) {
      console.log("Appwrite service :: createStory :: error", error);
      throw error; // Propagate the error
    }
  }
  async getStory(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteStoryCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getStory :: error", error);
      return false;
    }
  }

  async getStories(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteStoryCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getStories :: error", error);
      return false;
    }
  }

  async deleteStory(storyId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteStoryCollectionId,
        storyId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteStory :: error", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
