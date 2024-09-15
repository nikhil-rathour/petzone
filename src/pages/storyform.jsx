import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StoryForm() {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    try {
      const storyData = {
        userId: userData.$id,
        story: data.content,
        status: "active" 
      };

      const response = await appwriteService.createStory(storyData);
      if (response) {
        navigate("/story"); 
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a Story</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <Controller
        name="content"
        control={control}
        defaultValue=""
        rules={{ required: 'Content is required' }}
        render={({ field: { onChange, value } }) => (
          <div className="mb-6">
            <Editor
              apiKey="izyj26mi7epfzsvaj67t72ljcm2eyewrnjrs12c3na9n0b0j"
              value={value}
              onEditorChange={onChange}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'emoticons template paste textcolor colorpicker textpattern imagetools'
                ],
                toolbar1: 'formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image',
                toolbar2: 'undo redo | forecolor backcolor | fontselect fontsizeselect | emoticons | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
                image_advtab: true,
                templates: [
                  { title: 'Story Template', description: 'A basic story structure', content: '<h2>Introduction</h2><p>Your story begins here...</p><h2>Main Body</h2><p>Develop your story...</p><h2>Conclusion</h2><p>Wrap up your story...</p>' }
                ],
                style_formats: [
                  { title: 'Headers', items: [
                    { title: 'Header 1', format: 'h1' },
                    { title: 'Header 2', format: 'h2' },
                    { title: 'Header 3', format: 'h3' }
                  ]},
                  { title: 'Inline', items: [
                    { title: 'Bold', icon: 'bold', format: 'bold' },
                    { title: 'Italic', icon: 'italic', format: 'italic' },
                    { title: 'Underline', icon: 'underline', format: 'underline' },
                    { title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough' },
                    { title: 'Superscript', icon: 'superscript', format: 'superscript' },
                    { title: 'Subscript', icon: 'subscript', format: 'subscript' },
                    { title: 'Code', icon: 'code', format: 'code' }
                  ]}
                ]
              }}
            />
          </div>
        )}
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Submit Story
      </button>
    </form>
  );
}
