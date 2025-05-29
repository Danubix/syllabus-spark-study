
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Search, 
  Brain,
  Calendar,
  Award,
  Filter,
  Pin,
  StickyNote,
  MapPin,
  Eye,
  EyeOff
} from 'lucide-react';
import { mockSubjects, mockMathTopics } from '@/data/mockData';

interface DashboardProps {
  userName: string;
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName, onNavigate }) => {
  const [stressFreeMode, setStressFreeMode] = useState(false);
  const [minimalMode, setMinimalMode] = useState(false);
  const [timeFilter, setTimeFilter] = useState('any');
  const [focusFilter, setFocusFilter] = useState('any');
  const [pinnedTopics] = useState([
    mockMathTopics[1], // Indices and Standard Form
    mockMathTopics[4]  // Quadratic Equations
  ]);

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

  const weeklyProgress = [
    { day: 'Mon', completed: 2, target: 2 },
    { day: 'Tue', completed: 1, target: 2 },
    { day: 'Wed', completed: 3, target: 2 },
    { day: 'Thu', completed: 0, target: 2 },
    { day: 'Fri', completed: 0, target: 2 },
    { day: 'Sat', completed: 0, target: 2 },
    { day: 'Sun', completed: 0, target: 2 }
  ];

  const nextTopicsQueue = [
    { title: 'Percentage Calculations', difficulty: 'Core', time: 30, priority: 'High' },
    { title: 'Factorization', difficulty: 'Extended', time: 45, priority: 'Medium' },
    { title: 'Circle Theorems', difficulty: 'Extended', time: 60, priority: 'High' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 to-edu-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-edu-blue-700">IGCSE Study Hub</h1>
            <p className="text-muted-foreground">
              {stressFreeMode 
                ? `Every step counts, ${userName}. You're making great progress!` 
                : `Welcome back, ${userName}!`
              }
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                checked={stressFreeMode} 
                onCheckedChange={setStressFreeMode}
                id="stress-free"
              />
              <label htmlFor="stress-free" className="text-sm">Stress-Free Mode</label>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMinimalMode(!minimalMode)}
              >
                {minimalMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {minimalMode ? 'Full View' : 'Minimal'}
              </Button>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Assistant
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Section - Hide in minimal mode */}
        {!minimalMode && (
          <Card className="glass-effect animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Ready to continue your IGCSE journey?
                  </h2>
                  <p className="text-muted-foreground">
                    {stressFreeMode 
                      ? "Take your time. Learning is a journey, not a race."
                      : "You're making great progress! Keep up the momentum."
                    }
                  </p>
                </div>
                {!stressFreeMode && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-edu-green-500">
                      {totalProgress}%
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats - Hide badges in stress-free mode */}
        {!minimalMode && (
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
                <p className="text-sm text-muted-foreground">
                  {stressFreeMode ? 'Learning Days' : 'Study Streak'}
                </p>
                {!stressFreeMode && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    🏆 5-Day Streak
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subject Progress with Exam Countdown */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-edu-blue-500" />
                    Subject Progress
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Syllabus Heatmap
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSubjects.map(subject => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {subject.completedTopics}/{subject.totalTopics} topics
                          {!stressFreeMode && (
                            <span className="ml-2 text-orange-600">• Exam in: 45 days</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {subject.syllabusCode}
                        </Badge>
                        {subject.progress >= 80 && !stressFreeMode && (
                          <Badge variant="default" className="bg-edu-green-500">
                            Almost Done!
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                    {subject.progress >= 80 && !minimalMode && !stressFreeMode && (
                      <p className="text-xs text-edu-green-600">
                        🎯 You've completed 80% of {subject.name}. Finish it this week?
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* This Week's Plan */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>This Week's Plan</CardTitle>
                  <Button variant="outline" size="sm">
                    Plan My Week
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weeklyProgress.map(day => (
                    <div key={day.day} className="text-center">
                      <p className="text-xs font-medium mb-1">{day.day}</p>
                      <div className="space-y-1">
                        <div className="text-lg font-bold">
                          {day.completed}/{day.target}
                        </div>
                        <div className={`h-2 rounded-full ${
                          day.completed >= day.target 
                            ? 'bg-edu-green-500' 
                            : day.completed > 0 
                              ? 'bg-edu-blue-500' 
                              : 'bg-gray-200'
                        }`} />
                        {day.completed < day.target && day.day !== 'Sat' && day.day !== 'Sun' && (
                          <p className="text-xs text-red-500">
                            {day.target - day.completed} behind
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recently Studied with Quick Notes */}
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
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <StickyNote className="h-4 w-4" />
                        </Button>
                        <Badge variant={topic.status === 'completed' ? 'default' : 'secondary'}>
                          {topic.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Smart Filters for AI Suggestions */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5 text-edu-purple-500" />
                  Smart Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Time Available</label>
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any time</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60+ minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Focus Type</label>
                  <Select value={focusFilter} onValueChange={setFocusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any focus</SelectItem>
                      <SelectItem value="new">New topics</SelectItem>
                      <SelectItem value="revision">Revision</SelectItem>
                      <SelectItem value="difficult">Difficult topics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pinned Topics */}
            {pinnedTopics.length > 0 && (
              <Card className="glass-effect animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Pin className="h-5 w-5 text-edu-purple-500" />
                    Pinned for Later
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pinnedTopics.map(topic => (
                      <div key={topic.id} className="p-2 bg-edu-purple-50 rounded border border-edu-purple-100">
                        <h4 className="font-medium text-sm">{topic.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {topic.estimatedTime} min • {topic.difficulty}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Suggestions */}
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
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{topic.title}</h4>
                        <Button variant="ghost" size="sm">
                          <Pin className="h-3 w-3" />
                        </Button>
                      </div>
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

            {/* Next Topics Queue */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Next 3 Topics Queue</CardTitle>
                <CardDescription>Auto-prioritized for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {nextTopicsQueue.map((topic, index) => (
                    <div key={index} className="p-2 bg-white/50 rounded text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{topic.title}</p>
                        <Badge 
                          variant={topic.priority === 'High' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {topic.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {topic.time} min • {topic.difficulty}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
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
          </div>
        </div>
      </div>
    </div>
  );
};
