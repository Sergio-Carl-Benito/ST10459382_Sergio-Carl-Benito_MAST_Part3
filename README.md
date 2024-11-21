No feedback was necessary to implement as I got 100% on part 2. 
 
LINK TO YT VIDEO:  
 
Changelog 

 

New Features and Functional Enhancements 

    Filter Page and Menu Updates 

    Implemented filter page code to enhance the menu filtering functionality. 

    Added new filter menu button to replace the old touch opacity filter button. 

    Fixed filter page not filtering correctly. 

    Updated the filter menu page to show all items by default. 

    Added navigation back to home from the filter page. 

    Menu Item Management 

    Created a function to remove menu items from the list. 

    Ability to remove menu items on the Add Menu page implemented. 

    Created menu item removal feature with confirmation alert before removal. 

    Added a check on the Add Menu Item page to ensure no fields are left blank before submission. 

    Average Price Calculation 

    Added function to calculate the average price for menu items. 

    Rewrote code to calculate average price per course and a total average. 

    Initialized arrays to store individual prices of items in each course. 

    Added code for calculating average price and displaying the result. 

    State Management and Navigation 

    Added global state management using React Context for centralized menu state. 

    Rewrote root stack params to include parsed items from the filter menu. 

    Updated navigation and screens to use centralized menu state. 

 

UI/UX Improvements 

    Styling Updates 

    Enhanced styling for better user experience, including better contrast and design. 

    Replaced buttons with styled TouchableOpacity components for improved interaction. 

    Added shadow and elevation effects to menu items for a more polished look. 

    Increased width of the menu item to 100% for better alignment. 

    Added empty list text to indicate when no items are available. 

    Improved color scheme and design to enhance the visual appeal of the app. 

    Text and Font Styling 

    Added styles to DishName text to improve readability. 

    Unified font styling for consistent typography across dish name, description, and price. 

    Refined UI layout for better responsiveness and alignment. 

    Animation and Transitions 

    Moved animation logic into useEffect for efficient background color change and scaling of the title box. 

    Used Animated.loop and Animated.sequence for smooth scaling animations of the title box. 

 

Code Refactoring and Optimization 

    State Management Refactor 

    Simplified state management for menuItems using the useState hook. 

    Consolidated grouped item logic into a useMemo hook to optimize performance by avoiding unnecessary recalculations. 

    Data Handling Refactor 

    Reorganized the logic for calculating average prices, grouping items, and calculating averages for Starters, Mains, and Desserts using the reduce method. 

    Created a priceDetails array to store and display price-related data (total items, average prices per course) in a maintainable format. 

    Styling Refactor 

    Removed unused styles, including itemCountContainer and itemCount. 

    Consolidated redundant styles and merged button styling into buttonAdd and buttonText classes. 

    Simplified layout structure for better responsiveness and alignment. 

    Cleaned up animation-related styles by moving background color change logic to useEffect and dynamically applying color changes. 

 

General Enhancements and Bug Fixes 

    UI Improvements 

    Rewrote and refactored major style points to ensure consistency across all pages. 

    Updated total items text display to reflect current menu state. 

    Replaced $ with R for prices to align with local currency. 

    Added comments explaining key sections of the code for better clarity. 

    Performance and Design Consistency 

    Rewrote and refactored all major code sections and styling for improved performance and consistency. 

    Major overall styling updates for all pages to improve consistency and contrast for better accessibility. 

 

Miscellaneous Updates 

    Text Fields and Buttons 

    Added styling for text fields related to average price and total items for consistency across the app. 

    Simplified button container styles for better alignment and responsiveness. 

 
