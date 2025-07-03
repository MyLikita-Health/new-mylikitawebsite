"use client"

import { useEffect, useRef, useState } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your blog post...",
  height = "400px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let editorInstance: any = null

    const initializeEditor = async () => {
      try {
        const { default: ClassicEditor } = await import("@ckeditor/ckeditor5-build-classic")

        if (editorRef.current) {
          editorInstance = await ClassicEditor.create(editorRef.current, {
            placeholder,
            toolbar: {
              items: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "alignment",
                "|",
                "numberedList",
                "bulletedList",
                "outdent",
                "indent",
                "|",
                "link",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "horizontalLine",
                "|",
                "specialCharacters",
                "removeFormat",
                "|",
                "undo",
                "redo",
              ],
            },
            heading: {
              options: [
                { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
              ],
            },
            fontSize: {
              options: ["tiny", "small", "default", "big", "huge"],
            },
            fontFamily: {
              options: [
                "default",
                "Arial, Helvetica, sans-serif",
                "Courier New, Courier, monospace",
                "Georgia, serif",
                "Lucida Sans Unicode, Lucida Grande, sans-serif",
                "Tahoma, Geneva, sans-serif",
                "Times New Roman, Times, serif",
                "Trebuchet MS, Helvetica, sans-serif",
                "Verdana, Geneva, sans-serif",
                "Space Grotesk, sans-serif",
              ],
            },
            table: {
              contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties"],
            },
            link: {
              decorators: {
                openInNewTab: {
                  mode: "manual",
                  label: "Open in a new tab",
                  attributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                },
              },
            },
            mediaEmbed: {
              previewsInData: true,
            },
          })

          // Set initial content
          if (value) {
            editorInstance.setData(value)
          }

          // Listen for changes
          editorInstance.model.document.on("change:data", () => {
            const data = editorInstance.getData()
            onChange(data)
          })

          setEditor(editorInstance)
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error initializing CKEditor:", error)
        setIsLoading(false)
      }
    }

    initializeEditor()

    return () => {
      if (editorInstance) {
        editorInstance.destroy()
      }
    }
  }, [])

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getData()) {
      editor.setData(value)
    }
  }, [value, editor])

  if (isLoading) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 animate-pulse" style={{ height }}>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="text-center text-gray-500 mt-8">Loading rich text editor...</div>
      </div>
    )
  }

  return (
    <div className="rich-text-editor">
      <div ref={editorRef} style={{ minHeight: height }} className="prose max-w-none" />
      <style jsx global>{`
        .ck-editor__editable {
          min-height: ${height} !important;
        }
        
        .ck.ck-editor {
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .ck.ck-editor__main > .ck-editor__editable {
          border: none;
          padding: 1.5rem;
          font-family: 'Space Grotesk', sans-serif;
          line-height: 1.7;
        }
        
        .ck.ck-toolbar {
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 0.75rem;
        }
        
        .ck.ck-button:not(.ck-disabled):hover {
          background: #e5e7eb;
        }
        
        .ck.ck-button.ck-on {
          background: #3b82f6;
          color: white;
        }
        
        .ck-content h1,
        .ck-content h2,
        .ck-content h3,
        .ck-content h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .ck-content h1 { font-size: 2rem; }
        .ck-content h2 { font-size: 1.5rem; }
        .ck-content h3 { font-size: 1.25rem; }
        .ck-content h4 { font-size: 1.125rem; }
        
        .ck-content blockquote {
          border-left: 4px solid #3b82f6;
          background: #f3f4f6;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
        }
        
        .ck-content table {
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        
        .ck-content table td,
        .ck-content table th {
          border: 1px solid #d1d5db;
          padding: 0.75rem;
        }
        
        .ck-content table th {
          background: #f9fafb;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
