
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Search, 
  Brain,
  Calendar,
  Award
} from 'lucide-react';
import { mockSubjects, mockMathTopics } from '@/data/mockData';

interface DashboardProps {
  userName: string;
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName, onNavigate }) => {
  const totalProgress = Math.round(
    mockSubjects.reduce((sum, subject) => sum + subject.progress, 0) / mockSubjects.length
  );

  const recentTopics = mockMathTopics
    .filter(topic => topic.lastStudied)
    .sort((a, b) => new Date(b.lastStudied!).getTime() - new Date(a.lastStudied!).getTime())
    .slice(0, 3);

  const suggestedTopics = mockMathTopics
    .filter(topic => topic.status === 'not-started')
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 to-edu-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-edu-blue-700">IGCSE Study Hub</h1>
            <p className="text-muted-foreground">Welcome back, {userName}!</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Assistant
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <Card className="glass-effect animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Ready to continue your IGCSE journey?
                </h2>
                <p className="text-muted-foreground">
                  You're making great progress! Keep up the momentum.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-edu-green-500">
                  {totalProgress}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-effect hover-scale animate-fade-in">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-edu-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mockSubjects.length}</div>
              <p className="text-sm text-muted-foreground">Active Subjects</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-scale animate-fade-in">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-edu-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {mockSubjects.reduce((sum, s) => sum + s.completedTopics, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Topics Completed</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-scale animate-fade-in">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-edu-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-sm text-muted-foreground">Hours This Week</p>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-scale animate-fade-in">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Study Streak</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Progress */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-edu-blue-500" />
                  Subject Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSubjects.map(subject => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {subject.completedTopics}/{subject.totalTopics} topics
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {subject.syllabusCode}
                      </Badge>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle>Recently Studied</CardTitle>
                <CardDescription>
                  Topics you've worked on recently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTopics.map(topic => (
                    <div key={topic.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{topic.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {topic.chapter} • {topic.syllabusReference}
                        </p>
                      </div>
                      <Badge variant={topic.status === 'completed' ? 'default' : 'secondary'}>
                        {topic.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & AI Suggestions */}
          <div className="space-y-4">
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate('syllabus')}
                >
                  <BookOpen className="h-4 w-4" />
                  Browse Topics
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate('ai-assistant')}
                >
                  <Brain className="h-4 w-4" />
                  Ask AI Assistant
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate('progress')}
                >
                  <TrendingUp className="h-4 w-4" />
                  View Progress
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Study Planner
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-edu-purple-500" />
                  AI Suggestions
                </CardTitle>
                <CardDescription>
                  What you should study next
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestedTopics.map(topic => (
                    <div key={topic.id} className="p-3 bg-edu-purple-50 rounded-lg border border-edu-purple-100">
                      <h4 className="font-medium text-sm">{topic.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {topic.estimatedTime} min • {topic.difficulty}
                      </p>
                      <Button size="sm" className="w-full">
                        Start Topic
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Today's Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-edu-green-500">2/3</div>
                  <p className="text-sm text-muted-foreground">Topics completed today</p>
                  <Progress value={67} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    1 more topic to reach your daily goal!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
