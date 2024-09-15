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
        status: "active" // You might want to add a status field in your form if needed
      };

      const response = await appwriteService.createStory(storyData);
      if (response) {
        navigate("/"); // Redirect to home or stories page after successful submission
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AD49E1] to-[#EBD3F8] py-12">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a Story</h1>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-[#7360DF] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300 font-semibold text-lg"
              >
                Submit Story
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
