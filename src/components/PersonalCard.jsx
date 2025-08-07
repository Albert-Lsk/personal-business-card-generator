import React from 'react';
import { 
  MapPin, 
  Briefcase, 
  Target, 
  Award, 
  Lightbulb, 
  Heart, 
  Quote,
  User,
  Calendar,
  Globe
} from 'lucide-react';

const PersonalCard = ({ data }) => {
  if (!data) return null;

  const {
    name,
    location,
    tags,
    keyFocus,
    highlights,
    expertise,
    hobbies,
    motto,
    avatar,
    qrCode
  } = data;

  const getExpertiseColor = (index) => {
    const colors = [
      'bg-blue-50 border-blue-200 text-blue-800',
      'bg-green-50 border-green-200 text-green-800',
      'bg-purple-50 border-purple-200 text-purple-800',
      'bg-orange-50 border-orange-200 text-orange-800'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-md mx-auto overflow-hidden print:shadow-none print:max-w-full">
      {/* 头部信息 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="gradient-border w-20 h-20 rounded-full flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{name}</h2>
            <div className="flex items-center text-blue-100 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-6 space-y-6">
        {/* 近期关键投入 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Target className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">近期关键投入</h3>
          </div>
          <p className="text-sm text-gray-700">{keyFocus}</p>
        </div>

        {/* 履历亮点 */}
        <div>
          <div className="flex items-center mb-3">
            <Award className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">履历亮点</h3>
          </div>
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* 擅长领域 */}
        <div>
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">擅长领域</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {expertise.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getExpertiseColor(index)}`}
              >
                <h4 className="font-medium mb-1">{item.name}</h4>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 兴趣爱好 */}
        <div>
          <div className="flex items-center mb-3">
            <Heart className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">兴趣爱好</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* 页脚 */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Quote className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600 italic">{motto}</span>
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              {qrCode ? (
                <img
                  src={qrCode}
                  alt="联系二维码"
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                <div className="text-xs text-gray-400 text-center">
                  二维码
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalCard;