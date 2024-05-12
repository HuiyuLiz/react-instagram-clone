import { useCallback, useEffect, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'

import CloudUploadIcon from '@/components/icon/clouduploadicon'

interface FileUploaderProps {
  fileChangeHandler: (file: File[]) => void
  imageUrl: string
}

const FileUploader = ({ fileChangeHandler, imageUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>(imageUrl)

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles?.length !== 0) {
        fileChangeHandler(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      }
    },
    [fileChangeHandler]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.svg']
    },
    maxFiles: 1
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => {
      URL.revokeObjectURL(fileUrl)
    }
  }, [fileUrl])

  return (
    <div
      className="dark:hover:bg-bray-800 flex min-h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {fileUrl !== undefined ? (
        <div className="flex flex-col items-center justify-center lg:pb-6 lg:pt-5">
          <div className="flex w-full flex-1 justify-center p-5">
            <img
              src={fileUrl}
              alt="image"
              className="w-full object-cover object-top  lg:max-h-80"
            />
          </div>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Click or drag photo to replace
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <CloudUploadIcon className="h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG
          </p>
        </div>
      )}
    </div>
  )
}

export default FileUploader
