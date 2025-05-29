
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, BookOpen, Target, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

interface OnboardingData {
  subjects: string[];
  examBoard: string;
  goals: {
    topicsPerWeek: number;
    studyTimePerDay: number;
  };
}

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', code: '0580' },
  { id: 'physics', name: 'Physics', code: '0625' },
  { id: 'chemistry', name: 'Chemistry', code: '0620' },
  { id: 'biology', name: 'Biology', code: '0610' },
  { id: 'english', name: 'English Language', code: '0500' },
  { id: 'business', name: 'Business Studies', code: '0450' }
];

const EXAM_BOARDS = ['Cambridge', 'Edexcel', 'AQA', 'OCR'];

export const OnboardingFlow: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedExamBoard, setSelectedExamBoard] = useState('');
  const [goals, setGoals] = useState({ topicsPerWeek: 3, studyTimePerDay: 30 });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleComplete = () => {
    onComplete({
      subjects: selectedSubjects,
      examBoard: selectedExamBoard,
      goals
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return true;
      case 2: return selectedSubjects.length > 0;
      case 3: return selectedExamBoard !== '';
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 to-edu-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass-effect">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-edu-blue-700">
            Welcome to IGCSE Study Hub
          </CardTitle>
          <CardDescription>
            Let's personalize your learning experience
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {step} of {totalSteps}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="text-center space-y-4 animate-fade-in">
              <BookOpen className="mx-auto h-16 w-16 text-edu-blue-500" />
              <h3 className="text-xl font-semibold">Ready to excel in your IGCSEs?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our AI-powered study platform will help you master your syllabus, 
                track progress, and achieve your academic goals.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-semibold text-center">Select Your Subjects</h3>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map(subject => (
                  <div
                    key={subject.id}
                    onClick={() => handleSubjectToggle(subject.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-scale ${
                      selectedSubjects.includes(subject.id)
                        ? 'border-edu-blue-500 bg-edu-blue-50'
                        : 'border-gray-200 hover:border-edu-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">{subject.code}</p>
                      </div>
                      {selectedSubjects.includes(subject.id) && (
                        <Check className="h-5 w-5 text-edu-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-semibold text-center">Choose Your Exam Board</h3>
              <div className="grid grid-cols-2 gap-3">
                {EXAM_BOARDS.map(board => (
                  <Button
                    key={board}
                    variant={selectedExamBoard === board ? "default" : "outline"}
                    onClick={() => setSelectedExamBoard(board)}
                    className="h-16 text-lg"
                  >
                    {board}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <Target className="mx-auto h-12 w-12 text-edu-green-500 mb-4" />
                <h3 className="text-xl font-semibold">Set Your Study Goals</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topics per week: {goals.topicsPerWeek}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={goals.topicsPerWeek}
                    onChange={(e) => setGoals(prev => ({ 
                      ...prev, 
                      topicsPerWeek: parseInt(e.target.value) 
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Study time per day: {goals.studyTimePerDay} minutes
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={goals.studyTimePerDay}
                    onChange={(e) => setGoals(prev => ({ 
                      ...prev, 
                      studyTimePerDay: parseInt(e.target.value) 
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-edu-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-edu-blue-700 mb-2">Your Study Plan</h4>
                <div className="space-y-1 text-sm text-edu-blue-600">
                  <p>• {selectedSubjects.length} subjects selected</p>
                  <p>• {goals.topicsPerWeek} topics per week</p>
                  <p>• {goals.studyTimePerDay} minutes daily study time</p>
                  <p>• {selectedExamBoard} exam board</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setStep(prev => prev - 1)}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            {step < totalSteps ? (
              <Button
                onClick={() => setStep(prev => prev + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="flex items-center gap-2 bg-edu-green-500 hover:bg-edu-green-600"
              >
                Start Learning
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
