import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import FileUpload from './components/FileUpload';
import PersonalCard from './components/PersonalCard';
import InfoForm from './components/InfoForm';
import ErrorBoundary from './components/ErrorBoundary';
import AuthPage from './components/auth/AuthPage';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import DemoShowcase from './components/DemoShowcase';

// 主应用内容组件
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [cardData, setCardData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showDemo, setShowDemo] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="xl" text="正在加载..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const handleFileUpload = (file, content) => {
    setCurrentStep(2);
    const mockData = parseContent(content);
    setCardData(mockData);
  };

  const handleManualInput = (data) => {
    setCardData(data);
    setCurrentStep(3);
  };

  const parseContent = (content) => {
    return {
      name: "示例用户",
      location: "北京，中国",
      tags: ["产品经理", "技术爱好者", "创业者"],
      keyFocus: "专注于AI技术在产品中的应用，探索人机交互的新可能性",
      highlights: [
        "主导开发了3款月活百万级产品",
        "获得2023年度最佳产品奖",
        "技术博客拥有10万+关注者"
      ],
      expertise: [
        {
          name: "产品设计",
          description: "从0到1构建产品架构，深度理解用户需求"
        },
        {
          name: "AI应用",
          description: "将大语言模型应用于实际业务场景"
        },
        {
          name: "团队管理",
          description: "带领10人团队高效协作，持续交付价值"
        },
        {
          name: "数据分析",
          description: "用数据驱动产品决策，提升用户体验"
        }
      ],
      hobbies: ["📚 阅读", "🏃 跑步", "🎸 吉他", "✈️ 旅行"],
      motto: "持续学习，创造价值"
    };
  };

  const steps = [
    { id: 1, name: "上传信息", description: "上传您的简历或自我介绍" },
    { id: 2, name: "编辑信息", description: "确认并编辑名片信息" },
    { id: 3, name: "生成名片", description: "预览并下载您的名片" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              个人名片生成器
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              基于Claude Sonnet 4优化的智能名片生成工具
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDemo(false)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  !showDemo
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                创建名片
              </button>
              <button
                onClick={() => setShowDemo(true)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  showDemo
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                功能演示
              </button>
            </div>
          </header>

          {!showDemo && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-1 mx-2 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`}/>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto">
            {showDemo ? (
              <DemoShowcase />
            ) : (
              <>
                {currentStep === 1 && (
                  <FileUpload onFileUpload={handleFileUpload} />
                )}

                {currentStep === 2 && (
                  <InfoForm
                    initialData={cardData}
                    onSubmit={handleManualInput}
                    onBack={() => setCurrentStep(1)}
                  />
                )}

                {currentStep === 3 && cardData && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <PersonalCard data={cardData} />
                    </div>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        返回编辑
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        下载名片
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// 主App组件
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;