import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"


export default function RTE({name,control,label,defaultValue = ''}) {

    return (
        <div className='w-full'> 
            
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
            name={name || 'content'}
            control={control}
            render={({field : {onChange}}) => (
                <Editor
                // apiKey='tzyjvllb8q3chhwx0w66qtua7s8udszqfhq10qm2cozcykoe'
                initialValue={defaultValue}
                init={{
                    initialValue:defaultValue,
                    height:500,
                    menubar:true,
                    plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                    toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
                onEditorChange={onChange}
                />
            )}
            />
        </div>
    )
}

// export default RTE  //DOUBT: while exporting like this it shows store constanst or function use btw components in diff file for fast rendering , why it is do 