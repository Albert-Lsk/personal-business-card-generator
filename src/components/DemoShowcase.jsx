import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Share2, 
  Star,
  Users,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import PersonalCard from './PersonalCard';

const DemoShowcase = () => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 演示数据
  const demoCards = [
    {
      name: "张小明",
      location: "北京，中国",
      tags: ["产品经理", "AI专家", "创业者"],
      keyFocus: "专注于AI产品设计与用户体验优化，致力于将前沿技术转化为实用的产品解决方案",
      highlights: [
        "主导开发了3款月活千万级AI产品",
        "获得2024年度最佳产品创新奖",
        "技术博客拥有50万+关注者",
        "TEDx演讲嘉宾，分享AI产品设计理念"
      ],
      expertise: [
        {
          name: "AI产品设计",
          description: "深度理解AI技术，设计用户友好的智能产品"
        },
        {
          name: "用户体验",
          description: "以用户为中心，打造极致的产品体验"
        },
        {
          name: "团队领导",
          description: "带领跨职能团队，高效协作交付价值"
        },
        {
          name: "商业策略",
          description: "结合市场洞察，制定可持续的商业模式"
        }
      ],
      hobbies: ["📚 阅读", "🏃 马拉松", "🎸 吉他", "📷 摄影"],
      motto: "用技术创造美好生活"
    },
    {
      name: "李小红",
      location: "上海，中国",
      tags: ["UI/UX设计师", "视觉艺术家", "设计顾问"],
      keyFocus: "专注于数字产品的视觉设计与交互体验，擅长将复杂的功能转化为直观易用的界面",
      highlights: [
        "设计作品获得Red Dot国际设计大奖",
        "为50+知名品牌提供设计咨询服务",
        "Dribbble Top 1%设计师",
        "设计教育平台讲师，学员超过10万人"
      ],
      expertise: [
        {
          name: "界面设计",
          description: "创造美观且功能性强的用户界面"
        },
        {
          name: "品牌视觉",
          description: "构建一致性强的品牌视觉识别系统"
        },
        {
          name: "用户研究",
          description: "深入了解用户需求，指导设计决策"
        },
        {
          name: "设计系统",
          description: "建立可扩展的设计规范和组件库"
        }
      ],
      hobbies: ["🎨 绘画", "☕ 咖啡", "🌸 园艺", "🎭 戏剧"],
      motto: "设计改变世界"
    },
    {
      name: "王小强",
      location: "深圳，中国",
      tags: ["全栈工程师", "开源贡献者", "技术架构师"],
      keyFocus: "专注于高性能Web应用开发和云原生架构设计，热衷于开源技术和知识分享",
      highlights: [
        "GitHub开源项目获得10k+ Stars",
        "Google Developer Expert认证",
        "技术文章阅读量累计500万+",
        "多个大型项目技术负责人"
      ],
      expertise: [
        {
          name: "前端开发",
          description: "精通React、Vue等现代前端技术栈"
        },
        {
          name: "后端架构",
          description: "设计高可用、高并发的分布式系统"
        },
        {
          name: "云原生",
          description: "Kubernetes、Docker等容器化技术专家"
        },
        {
          name: "性能优化",
          description: "系统性能调优和架构优化经验丰富"
        }
      ],
      hobbies: ["💻 编程", "🎮 游戏", "🏀 篮球", "🎵 音乐"],
      motto: "代码改变世界"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "智能解析",
      description: "AI自动提取关键信息，一键生成专业名片"
    },
    {
      icon: Star,
      title: "精美设计",
      description: "多种专业模板，响应式设计适配所有设备"
    },
    {
      icon: Users,
      title: "个性化定制",
      description: "灵活编辑功能，打造独一无二的个人品牌"
    },
    {
      icon: TrendingUp,
      title: "数据驱动",
      description: "基于大数据分析，优化名片展示效果"
    }
  ];

  const stats = [
    { label: "用户数量", value: "10,000+", icon: Users },
    { label: "生成名片", value: "50,000+", icon: Award },
    { label: "满意度", value: "98%", icon: Star },
    { label: "平均评分", value: "4.9", icon: TrendingUp }
  ];

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demoCards.length);
  };

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demoCards.length) % demoCards.length);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 自动播放逻辑
  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextDemo, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-16 p-8">
      {/* 功能特色 */}
      <section className="text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-6">
            为什么选择我们？
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            基于Claude Sonnet 4的智能名片生成器，让您的个人品牌更加专业和吸引人
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 实时演示 */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            实时演示
          </h2>
          <p className="text-lg text-gray-600">
            查看我们的AI如何生成专业的个人名片
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <button
              onClick={prevDemo}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleAutoPlay}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? '暂停' : '播放'}</span>
            </button>
            
            <button
              onClick={nextDemo}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5 transform rotate-180" />
            </button>
          </div>

          <div className="flex justify-center">
            <PersonalCard data={demoCards[currentDemo]} />
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {demoCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDemo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentDemo ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            用户信赖的选择
          </h2>
          <p className="text-blue-100">
            数万用户的共同选择，专业品质值得信赖
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-blue-100 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 行动号召 */}
      <section className="text-center bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          准备好创建您的专业名片了吗？
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          只需几分钟，就能拥有一张令人印象深刻的个人名片
        </p>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>立即开始</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>分享给朋友</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default DemoShowcase;
