import React, { useState } from 'react';
import { Upload, FileText, Image, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const validTypes = [
      'text/plain',
      'text/markdown',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setError('不支持的文件格式。支持：txt, md, pdf, docx, jpg');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('文件大小不能超过10MB');
      return;
    }

    setFile(selectedFile);
    setError('');
    processFile(selectedFile);
  };

  const processFile = async (file) => {
    setLoading(true);
    
    try {
      let content = '';
      
      if (file.type === 'text/plain' || file.type === 'text/markdown') {
        content = await file.text();
      } else if (file.type === 'application/pdf') {
        content = 'PDF文件内容（待实现OCR解析）';
      } else if (file.type === 'image/jpeg') {
        content = '图片文件内容（待实现OCR解析）';
      } else {
        content = '文件内容已接收';
      }

      // 模拟API调用延迟
      setTimeout(() => {
        onFileUpload(file, content);
        setLoading(false);
      }, 1500);
      
    } catch (err) {
      setError('文件处理失败，请重试');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
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
              accept=".txt,.md,.pdf,.docx,.jpg,.jpeg"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              选择文件
            </label>
          </div>
        </div>

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
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-gray-600">正在处理您的信息...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;