```mermaid
classDiagram
    %% Style Definitions (moved to top)
    classDef todo fill:#ffeb3b
    classDef future fill:#90caf9
    classDef existing fill:#ffffff

    class App {
        +layout.tsx
        +page.tsx
    }
    
    class API {
        +auth
        +submit-assignment
    }
    
    class Pages {
        +assnsetting
        +course
        +dashboard
        +editor
        +studentgrading
        +studentsubmission
    }
    
    class Components {
        +gradinginterface.tsx
        +rubricoutline.tsx
        +ui
    }
    
    class UIComponents {
        +alert.tsx
        +button.tsx
        +card.tsx
        +checkbox.tsx
        +dialog.tsx
        +input.tsx
        +label.tsx
        +radio-group.tsx
        +separator.tsx
    }
    
    class Hooks {
        +useAuth.ts
    }
    
    class Utils {
        +PromiseWithResolvers.tsx
    }
    
    class Lib {
        +utils.ts
    }
    
    class Fonts {
        +GeistMonoVF.woff
        +GeistVF.woff
    }

    class Layout {
        +render()
        -AppSidebar
        -children
    }

    class AppSidebar {
        +isOpen: boolean
        +toggleSidebar()
        +navigateToRoute()
    }

    class Store {
        +state: AppState
        +dispatch(action: Action)
        +subscribe(listener: Function)
    }

    class GradingInterface {
        <<TODO>>
        -submissions: Submission[]
        -currentIndex: number
        -groupedAnswers: AnswerGroup[]
        +grade(submissionId: string)
        +navigateSubmission()
        +saveGrade()
        +bulkGrade(groupId: string)
        +addComments()
    }

    class RubricOutline {
        <<TODO>>
        -items: RubricItem[]
        -totalScore: number
        -weightedScoring: boolean
        +addItem()
        +removeItem()
        +updateScore()
        +importRubric()
        +exportRubric()
    }

    class AnalyticsDashboard {
        <<TODO>>
        -gradeDistribution: Chart
        -commonMistakes: Analysis[]
        -timeSpentGrading: Metrics
        +generateReports()
        +exportAnalytics()
    }

    class AutoGrader {
        <<TODO>>
        -answerKey: string
        -similarityThreshold: number
        +matchAnswers()
        +suggestGrades()
        +learnFromFeedback()
    }

    class StudentFeedback {
        <<TODO>>
        -feedback: string[]
        -rubricItems: RubricItem[]
        -annotations: Annotation[]
        +generateReport()
        +addAnnotation()
    }

    class BatchProcessing {
        <<TODO>>
        -submissionBatch: Submission[]
        -processingStatus: Status
        +processUploads()
        +validateSubmissions()
    }

    class AIAssistant {
        <<TODO>>
        -model: string
        -confidence: number
        +suggestGrades()
        +generateFeedback()
        +detectPlagiarism()
    }

    class GradingQueue {
        <<TODO>>
        -pendingSubmissions: Queue
        -priorityRules: Rule[]
        +prioritize()
        +assignGraders()
    }

    class PerformanceMonitor {
        <<TODO>>
        -metrics: Metrics[]
        -alerts: Alert[]
        +trackTiming()
        +generateReport()
    }
    class RealTimeCollaboration {
        <<FUTURE>>
        +syncGrades()
        +chatWithGraders()
        +shareNotes()
    }

    %% Relationships
    Layout "1" *-- "1" AppSidebar
    GradingInterface "1" *-- "1" RubricOutline
    GradingInterface "1" *-- "1" AutoGrader
    GradingInterface "1" *-- "1" StudentFeedback
    AnalyticsDashboard ..> GradingInterface : analyzes
    AutoGrader ..> AIAssistant : uses
    GradingQueue ..> CollaborativeGrading : manages
    QualityControl ..> GradingInterface : monitors
    CollaborativeGrading ..> RealTimeCollaboration : extends
    MachineLearning ..> AutoGrader : enhances
    PlagiarismDetection ..> QualityControl : supports
    BatchProcessing ..> GradingQueue : feeds
    ExportManager ..> AnalyticsDashboard : exports
    App --> API
    App --> Pages
    App --> Components
    App --> Hooks
    App --> Utils
    Components --> UIComponents
    App --> Fonts

    %% Apply styles individually
    class GradingInterface todo
    class RubricOutline todo
    class AnalyticsDashboard todo
    class AutoGrader todo
    class StudentFeedback todo
    class BatchProcessing todo
    class AIAssistant todo
    class GradingQueue todo
    class PerformanceMonitor todo
    class CollaborativeGrading todo
    class QualityControl todo
    class ExportManager todo
    
    class MachineLearning future
    class PlagiarismDetection future
    class RealTimeCollaboration future
    
    class Layout existing
    class AppSidebar existing
    class Store existing