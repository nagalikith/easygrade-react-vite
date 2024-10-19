```mermaid
classDiagram
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
    
    App --> API
    App --> Pages
    App --> Components
    App --> Hooks
    App --> Utils
    App --> Lib
    Components --> UIComponents
    App --> Fonts