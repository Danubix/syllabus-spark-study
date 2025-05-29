
import React, { useState } from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { Dashboard } from '@/components/Dashboard';
import { SyllabusViewer } from '@/components/SyllabusViewer';
import { TopicDetail } from '@/components/TopicDetail';
import { Topic } from '@/types';

type AppRoute = 'onboarding' | 'dashboard' | 'syllabus' | 'topic-detail' | 'ai-assistant' | 'progress';

const Index = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('onboarding');
  const [userName, setUserName] = useState('Sarah');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding completed with data:', data);
    setIsOnboarded(true);
    setCurrentRoute('dashboard');
  };

  const handleNavigation = (route: string) => {
    setCurrentRoute(route as AppRoute);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentRoute('topic-detail');
  };

  const handleTopicStatusChange = (newStatus: Topic['status']) => {
    if (selectedTopic) {
      setSelectedTopic({
        ...selectedTopic,
        status: newStatus,
        lastStudied: new Date()
      });
    }
  };

  // Show onboarding if not completed
  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Route rendering
  switch (currentRoute) {
    case 'dashboard':
      return (
        <Dashboard 
          userName={userName} 
          onNavigate={handleNavigation}
        />
      );
    
    case 'syllabus':
      return (
        <SyllabusViewer
          subjectName="Mathematics"
          onTopicSelect={handleTopicSelect}
          onBack={() => setCurrentRoute('dashboard')}
        />
      );
    
    case 'topic-detail':
      return selectedTopic ? (
        <TopicDetail
          topic={selectedTopic}
          onBack={() => setCurrentRoute('syllabus')}
          onStatusChange={handleTopicStatusChange}
        />
      ) : (
        <Dashboard userName={userName} onNavigate={handleNavigation} />
      );
    
    default:
      return (
        <Dashboard 
          userName={userName} 
          onNavigate={handleNavigation}
        />
      );
  }
};

export default Index;
