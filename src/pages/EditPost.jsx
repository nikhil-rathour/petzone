import React, {memo, useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import SellPet from './SellPet';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost)
                } else {
                    navigate('/')
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <SellPet post={post} />
        </div>
    ) : null
}

export default memo(EditPost)