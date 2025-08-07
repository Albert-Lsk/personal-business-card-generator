import React, { useState, useCallback } from 'react';
import { Upload, FileText, Image, AlertCircle, CheckCircle, X } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = useCallback((selectedFile) => {
    // 重置状态
    setError('');
    setSuccess(false);
    setUploadProgress(0);

    const validTypes = [
      'text/plain',
      'text/markdown',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    const validExtensions = ['.txt', '.md', '.pdf', '.docx', '.jpg', '.jpeg', '.png'];
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

    if (!validTypes.includes(selectedFile.type) && !hasValidExtension) {
      setError('不支持的文件格式。支持：txt, md, pdf, docx, jpg, jpeg, png');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('文件大小不能超过10MB');
      return;
    }

    if (selectedFile.size === 0) {
      setError('文件为空，请选择有效文件');
      return;
    }

    setFile(selectedFile);
    processFile(selectedFile);
  }, []);

  const processFile = async (file) => {
    setLoading(true);
    setUploadProgress(0);

    try {
      let content = '';

      // 模拟上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 150);

      if (file.type === 'text/plain' || file.type === 'text/markdown') {
        content = await file.text();
        if (!content.trim()) {
          throw new Error('文件内容为空');
        }
      } else if (file.type === 'application/pdf') {
        content = 'PDF文件内容（待实现OCR解析）';
      } else if (file.type.startsWith('image/')) {
        content = '图片文件内容（待实现OCR解析）';
      } else {
        content = '文件内容已接收';
      }

      // 模拟API调用延迟
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setSuccess(true);

        setTimeout(() => {
          onFileUpload(file, content);
          setLoading(false);
        }, 500);
      }, 1000);

    } catch (err) {
      setError(err.message || '文件处理失败，请重试');
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setError('');
    setLoading(false);
    setUploadProgress(0);
    setSuccess(false);
    setDragActive(false);
  };

  const handleTextInput = (text) => {
    if (text.trim()) {
      setLoading(true);
      setTimeout(() => {
        onFileUpload(null, text);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            上传个人信息
          </h2>
          <p className="text-gray-600">
            支持文本消息、txt、md、pdf、word、jpg文件
          </p>
        </div>

        {/* 拖拽上传区域 */}
        {!loading && !success && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  拖拽文件到此处
                </p>
                <p className="text-sm text-gray-500">
                  或点击选择文件
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handleInputChange}
                accept=".txt,.md,.pdf,.docx,.jpg,.jpeg,.png"
                disabled={loading}
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                选择文件
              </label>
            </div>
          </div>
        )}

        {/* 上传进度 */}
        {loading && (
          <div className="border-2 border-blue-200 rounded-lg p-8 text-center bg-blue-50">
            <div className="space-y-4">
              <LoadingSpinner size="lg" text="正在处理文件..." />
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{uploadProgress}% 完成</p>
              {file && (
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
                  <FileText className="w-4 h-4" />
                  <span>{file.name}</span>
                  <span className="text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 上传成功 */}
        {success && !loading && (
          <div className="border-2 border-green-200 rounded-lg p-8 text-center bg-green-50">
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <div>
                <p className="text-lg font-medium text-green-900">
                  文件上传成功！
                </p>
                <p className="text-sm text-green-700">
                  正在跳转到编辑页面...
                </p>
              </div>
              {file && (
                <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
                  <FileText className="w-4 h-4" />
                  <span>{file.name}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 支持的文件类型 */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">支持的文件类型：</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: FileText, name: '文本文件', ext: '.txt' },
              { icon: FileText, name: 'Markdown', ext: '.md' },
              { icon: FileText, name: 'PDF文档', ext: '.pdf' },
              { icon: FileText, name: 'Word文档', ext: '.docx' },
              { icon: Image, name: '图片文件', ext: '.jpg' }
            ].map((type, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <type.icon className="w-4 h-4" />
                <span>{type.name} ({type.ext})</span>
              </div>
            ))}
          </div>
        </div>

        {/* 或手动输入 */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">
            或直接输入文本
          </h3>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="请输入您的个人简介或自我介绍..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleTextInput(e.target.value);
              }
            }}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            按 Ctrl+Enter 快速提交
          </p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
              <button
                onClick={resetUpload}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 重置按钮 */}
        {(file || success) && !loading && (
          <div className="mt-4 text-center">
            <button
              onClick={resetUpload}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              重新上传
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;