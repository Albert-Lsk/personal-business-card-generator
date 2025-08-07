import React, { useState } from 'react';
import { ChevronLeft, Save, Edit3 } from 'lucide-react';

const InfoForm = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    tags: initialData?.tags?.join(', ') || '',
    keyFocus: initialData?.keyFocus || '',
    highlights: initialData?.highlights?.join('\n') || '',
    expertise: initialData?.expertise || [
      { name: '', description: '' },
      { name: '', description: '' },
      { name: '', description: '' },
      { name: '', description: '' }
    ],
    hobbies: initialData?.hobbies?.join(', ') || '',
    motto: initialData?.motto || '',
    avatar: initialData?.avatar || '',
    qrCode: initialData?.qrCode || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExpertiseChange = (index, field, value) => {
    const newExpertise = [...formData.expertise];
    newExpertise[index] = { ...newExpertise[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      expertise: newExpertise
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      highlights: formData.highlights.split('\n').map(h => h.trim()).filter(h => h),
      hobbies: formData.hobbies.split(',').map(h => h.trim()).filter(h => h),
      expertise: formData.expertise.filter(exp => exp.name.trim() && exp.description.trim())
    };
    
    onSubmit(processedData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">编辑名片信息</h2>
          <div className="w-20"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                姓名 *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您的姓名"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                地点 *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例如：北京，中国"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              身份标签（用逗号分隔）
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="例如：产品经理, 技术爱好者, 创业者"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              近期关键投入 *
            </label>
            <textarea
              required
              value={formData.keyFocus}
              onChange={(e) => handleInputChange('keyFocus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="一句话描述您近期关键投入的事业/领域"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              履历亮点（每行一个）
            </label>
            <textarea
              value={formData.highlights}
              onChange={(e) => handleInputChange('highlights', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="例如：主导开发了3款月活百万级产品"
            />
          </div>

          {/* 擅长领域 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              擅长领域
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.expertise.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={exp.name}
                    onChange={(e) => handleExpertiseChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`领域 ${index + 1} 名称`}
                  />
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExpertiseChange(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    placeholder={`领域 ${index + 1} 描述`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              兴趣爱好（用逗号分隔）
            </label>
            <input
              type="text"
              value={formData.hobbies}
              onChange={(e) => handleInputChange('hobbies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="例如：📚 阅读, 🏃 跑步, 🎸 吉他, ✈️ 旅行"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              个人态度/座右铭
            </label>
            <input
              type="text"
              value={formData.motto}
              onChange={(e) => handleInputChange('motto', e.target.value)}
              maxLength={25}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="不超过25字"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                头像URL（可选）
              </label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                二维码URL（可选）
              </label>
              <input
                type="url"
                value={formData.qrCode}
                onChange={(e) => handleInputChange('qrCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/qrcode.png"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>生成名片</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoForm;