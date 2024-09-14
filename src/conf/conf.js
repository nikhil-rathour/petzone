const conf = {
    appwriteUrl: (import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: (import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: (import.meta.env.VITE_APPWRITE_DATABSE_ID ),
    appwritePetsCollectionId: (import.meta.env.VITE_APPWRITE_PETS_COLLECTION_ID),
    appwriteBucketId: (import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf