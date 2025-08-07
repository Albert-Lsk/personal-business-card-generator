import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 模拟用户数据库
  const mockUsers = [
    {
      id: 1,
      email: 'demo@example.com',
      password: 'demo123',
      name: '演示用户',
      avatar: null,
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    // 检查是否有保存的登录状态
    const savedUser = Cookies.get('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user:', err);
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 查找用户
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('邮箱或密码错误');
      }

      // 创建用户会话（移除密码）
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        avatar: foundUser.avatar,
        createdAt: foundUser.createdAt
      };

      setUser(userSession);
      Cookies.set('user', JSON.stringify(userSession), { expires: 7 }); // 7天过期
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError('');

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 检查用户是否已存在
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('该邮箱已被注册');
      }

      // 创建新用户
      const newUser = {
        id: mockUsers.length + 1,
        email,
        password,
        name,
        avatar: null,
        createdAt: new Date().toISOString()
      };

      mockUsers.push(newUser);

      // 自动登录
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt
      };

      setUser(userSession);
      Cookies.set('user', JSON.stringify(userSession), { expires: 7 });
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    setError('');

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
