import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            value={value}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "charmap", "preview", 
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen", 
                "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar: 
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;