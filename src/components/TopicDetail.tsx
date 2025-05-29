
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  FileText, 
  Video, 
  HelpCircle,
  Check,
  Star,
  Edit3,
  Tag,
  Calendar
} from 'lucide-react';
import { Topic } from '@/types';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
  onStatusChange: (newStatus: Topic['status']) => void;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ 
  topic, 
  onBack, 
  onStatusChange 
}) => {
  const [notes, setNotes] = useState(topic.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-edu-green-500 hover:bg-edu-green-600';
      case 'in-progress':
        return 'bg-edu-blue-500 hover:bg-edu-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getNextStatus = () => {
    switch (topic.status) {
      case 'not-started':
        return 'in-progress';
      case 'in-progress':
        return 'completed';
      case 'completed':
        return 'in-progress';
      default:
        return 'in-progress';
    }
  };

  const getStatusButtonText = () => {
    switch (topic.status) {
      case 'not-started':
        return 'Start Topic';
      case 'in-progress':
        return 'Mark Complete';
      case 'completed':
        return 'Review Topic';
      default:
        return 'Start Topic';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 to-edu-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Syllabus
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-edu-blue-700">{topic.title}</h1>
              <p className="text-muted-foreground">{topic.chapter} • {topic.syllabusReference}</p>
            </div>
            <Button
              onClick={() => onStatusChange(getNextStatus())}
              className={`${getStatusColor(topic.status)} text-white`}
            >
              {getStatusButtonText()}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Topic Overview */}
        <Card className="glass-effect animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {topic.description}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Badge variant="outline" className="text-sm">
                  {topic.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {topic.estimatedTime} minutes
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Status</h4>
                <Badge className={getStatusColor(topic.status)}>
                  {topic.status.replace('-', ' ')}
                </Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Exam Tags</h4>
                <div className="flex gap-1">
                  {topic.examTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Last Studied</h4>
                <p className="text-sm text-muted-foreground">
                  {topic.lastStudied 
                    ? new Date(topic.lastStudied).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resources */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-edu-blue-500" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <FileText className="h-5 w-5 text-edu-blue-500" />
                    <span className="text-sm">Study Notes</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <Video className="h-5 w-5 text-edu-green-500" />
                    <span className="text-sm">Video Lessons</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <HelpCircle className="h-5 w-5 text-edu-purple-500" />
                    <span className="text-sm">Practice Questions</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <Check className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm">Past Papers</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5 text-edu-blue-500" />
                    My Notes
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                  >
                    {isEditingNotes ? 'Save' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditingNotes ? (
                  <Textarea
                    placeholder="Add your personal notes for this topic..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    className="w-full"
                  />
                ) : (
                  <div className="min-h-[120px] p-3 bg-gray-50 rounded-md">
                    {notes ? (
                      <p className="text-sm whitespace-pre-wrap">{notes}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No notes yet. Click Edit to add your thoughts!
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5 text-edu-purple-500" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topic.userTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {topic.userTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No tags yet. Add tags to organize your topics!
                  </p>
                )}
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Add Tag
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Star className="h-4 w-4" />
                  Add to Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Review
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700">
                  <HelpCircle className="h-4 w-4" />
                  Mark as Difficult
                </Button>
              </CardContent>
            </Card>

            {/* Related Topics */}
            <Card className="glass-effect animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Related Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-white/50 rounded text-sm">
                    <p className="font-medium">Percentage Calculations</p>
                    <p className="text-xs text-muted-foreground">Number • 1.4</p>
                  </div>
                  <div className="p-2 bg-white/50 rounded text-sm">
                    <p className="font-medium">Rate Problems</p>
                    <p className="text-xs text-muted-foreground">Number • 1.5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
