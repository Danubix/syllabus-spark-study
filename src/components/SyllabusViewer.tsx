
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  BookOpen,
  Check,
  Play,
  Pause
} from 'lucide-react';
import { mockChapters, mockMathTopics } from '@/data/mockData';
import { Topic } from '@/types';

interface SyllabusViewerProps {
  subjectName: string;
  onTopicSelect: (topic: Topic) => void;
  onBack: () => void;
}

export const SyllabusViewer: React.FC<SyllabusViewerProps> = ({ 
  subjectName, 
  onTopicSelect, 
  onBack 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['1']);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const filteredTopics = mockMathTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || topic.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-edu-green-500" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-edu-blue-500" />;
      default:
        return <Pause className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-edu-green-100 text-edu-green-700 border-edu-green-200';
      case 'in-progress':
        return 'bg-edu-blue-100 text-edu-blue-700 border-edu-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 to-edu-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack}>
                ← Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-edu-blue-700">{subjectName}</h1>
                <p className="text-muted-foreground">Cambridge IGCSE Syllabus</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              0580
            </Badge>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-md border border-input bg-background"
            >
              <option value="all">All Topics</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chapter Overview */}
          <div className="lg:col-span-1">
            <Card className="glass-effect animate-fade-in sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Chapters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockChapters.map(chapter => (
                  <div key={chapter.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{chapter.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {chapter.progress}%
                      </span>
                    </div>
                    <Progress value={chapter.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {chapter.topics.length} topics
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Topics List */}
          <div className="lg:col-span-3 space-y-4">
            {mockChapters.map(chapter => (
              <Card key={chapter.id} className="glass-effect animate-fade-in">
                <CardHeader className="pb-3">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="flex items-center justify-between w-full text-left hover:bg-white/50 rounded p-2 -m-2"
                  >
                    <div className="flex items-center gap-3">
                      {expandedChapters.includes(chapter.id) ? (
                        <ChevronDown className="h-5 w-5 text-edu-blue-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-edu-blue-500" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{chapter.title}</CardTitle>
                        <CardDescription>
                          {chapter.topics.length} topics • {chapter.progress}% complete
                        </CardDescription>
                      </div>
                    </div>
                    <Progress value={chapter.progress} className="w-24 h-2" />
                  </button>
                </CardHeader>

                {expandedChapters.includes(chapter.id) && (
                  <CardContent className="space-y-3">
                    {chapter.topics
                      .filter(topic => filteredTopics.includes(topic))
                      .map(topic => (
                        <div
                          key={topic.id}
                          onClick={() => onTopicSelect(topic)}
                          className="p-4 rounded-lg border border-gray-200 hover:border-edu-blue-300 hover:bg-white/50 cursor-pointer transition-all hover-scale"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(topic.status)}
                              <h4 className="font-medium">{topic.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {topic.syllabusReference}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getStatusColor(topic.status)}`}
                              >
                                {topic.status.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {topic.description}
                          </p>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {topic.estimatedTime} min
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {topic.difficulty}
                              </Badge>
                            </div>
                            
                            {topic.userTags.length > 0 && (
                              <div className="flex gap-1">
                                {topic.userTags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          {topic.lastStudied && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Last studied: {new Date(topic.lastStudied).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
