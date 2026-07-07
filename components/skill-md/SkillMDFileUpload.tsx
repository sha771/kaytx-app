import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react-native';
import { api } from '@/utils/api';

interface SkillMDFileUploadProps {
  agentId?: string;
  onUploadComplete?: (skillFile: any) => void;
  onError?: (error: string) => void;
}

interface UploadFile {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  skillFileId?: string;
}

export function SkillMDFileUpload({ agentId, onUploadComplete, onError }: SkillMDFileUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const uploadMutation = api.skillMD.uploadSkillFile.useMutation();

  const processFile = useCallback(async (uploadFile: UploadFile) => {
    try {
      // Update status to uploading
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, status: 'uploading', progress: 20 } : f
      ));

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;

        // Update status to processing
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id ? { ...f, status: 'processing', progress: 50 } : f
        ));

        try {
          const result = await uploadMutation.mutateAsync({
            fileName: uploadFile.file.name,
            mimeType: uploadFile.file.type,
            fileData: base64,
            agentId,
            category: 'document',
            tags: [],
            language: 'en',
          });

          // Update status to completed
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id ? { ...f, status: 'completed', progress: 100, skillFileId: result.skillFile.id } : f
          ));

          onUploadComplete?.(result.skillFile);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Upload failed';
          setFiles(prev => prev.map(f => 
            f.id === uploadFile.id ? { ...f, status: 'error', error: errorMessage } : f
          ));
          onError?.(errorMessage);
        }
      };
      reader.readAsDataURL(uploadFile.file);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Processing failed';
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, status: 'error', error: errorMessage } : f
      ));
      onError?.(errorMessage);
    }
  }, [uploadMutation, agentId, onUploadComplete, onError]);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    
    const uploadFiles: UploadFile[] = fileArray.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: 'pending' as const,
      progress: 0,
    }));

    setFiles(prev => [...prev, ...uploadFiles]);

    // Process each file
    uploadFiles.forEach(uploadFile => {
      processFile(uploadFile);
    });
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'pending':
        return <FileText className="w-4 h-4 text-gray-400" />;
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: UploadFile['status']) => {
    switch (status) {
      case 'pending':
        return 'Waiting...';
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
          onChange={handleFileInput}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supports PDF, Word, Text, CSV, and Excel files
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map(file => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1">
                {getStatusIcon(file.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getStatusText(file.status)} • {(file.file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
