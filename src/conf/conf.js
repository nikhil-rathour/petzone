const conf = {
    appwriteUrl: (import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: (import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: (import.meta.env.VITE_APPWRITE_DATABASE_ID ),
    appwritePetsCollectionId: (import.meta.env.VITE_APPWRITE_PETS_COLLECTION_ID),
    appwriteBucketId: (import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteStoryCollectionId: (import.meta.env.VITE_APPWRITE_STORY_COLLECTION_ID),
}

export default conf