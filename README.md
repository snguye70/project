# 🏃‍♀️💨 My Running Diary

**Project Overview:**

"My running diary" is a data visualization project I created based on cleaning up my Strava data and chronicling my running activity over the past year. With p5.js, I created an interactive visualization incorporating journal entries, medication use, emotional reflections, and pictures to help me remember key moments. My running, inhaler use, emotions, and the power of community were all tracked within the scope of this project, which allowed me to gain deeper insights about the challenges of running alone as well as the power of community. To refine and deploy the project, I converted it to a Git page using Visual Studio Code.

**Tools Used:**

* p5.js: JavaScript library that enabled me to create dynamic graphics within IDE to life.
* Visual Studio Code: Primary IDE  for organizing the project's code, refining the structure, and deploying the final version to GitHub Pages.

**Technical Approach:**

* Canvas setup:Defined constants like CANVAS.WIDTH and CANVAS.HEIGHT to ensure a consistent visual layout.
The canvas was segmented into different areas, including the journal entry graph, data viz map, and tool tip for optimal placement of visual elements like the timeline, data points, and journal entries.
* Dataset: Loaded Strava data from a CSV file containing columns such as "Distance (Mi)," "Journal Entry," “Activity name,” “Type of Run,” “Medication use,” and "Emotion."
Each row represented a unique run, and the data was iterated through to display the corresponding information visually.
* Mapping data: The map() function translated the raw data into visual coordinates on the canvas. For example, distances were mapped to the Y-axis to display the lengths of runs, while time-based data was mapped to the X-axis to track progress over time.
* Dynamic timeline: The visualization updated dynamically with each frame, simulating a timeline of activities. The current activity was highlighted with a trace of recent data points.
Journal entries and emojis were displayed alongside the data points, helping me remember the running experience that day.
* Tooltip with images: Tooltips provided additional metadata, including images associated with each run. Images were preloaded and mapped to specific activity names. For example, the run "Lake Twenty Two ✌ ️" shows the image Lake22.jpg.
* Moving to Visual Studio Code: After prototyping the project in p5.js, I transitioned it into Visual Studio Code to structure it as an HTML, CSS, and JavaScript application.
The HTML page embedded the p5.js sketch, allowing the visualization to be viewed in a web browser. Later deploying it as a Github page.

**Key Variables:**

* CANVAS: Stores the canvas dimensions and color style to control the overall layout.
* table: Holds the CSV data loaded from Strava, containing details of each run such as distance, journal entries, and emotions.
* images: An object that maps activity names to images, linking specific runs to their associated memories
* mapX, mapY: Coordinates for placing data points on the canvas, representing different run metrics.
* previousMapX, previousGraphX: Variables used to draw connecting lines between data points, creating a continuous visual flow that represents my running journey over time.

**Next Steps:**

If I had more time to expand this project, I would explore several key areas for further development:
Add more data points
* Race Milestones: I'd like to include specific race milestones, highlighting key events like 5Ks, 10Ks, and half marathons. This would provide a clearer view of my progress and achievements over time.
Elevation data: Adding elevation data to the visualization could give more context to the runs, showing how terrain impacted my performance and emotional state during different routes.
* Advance visual aesthetics: Interactive Filters: Implementing interactive filters would let users focus on specific data, such as filtering runs by weather conditions, distance, or emotional states. This would make the tool  more customizable and user-friendly.
D3.js or Plotly: While p5.js has been a fantastic tool for this project, exploring other visualization libraries like D3.js or Plotly could offer more advanced charting and interactivity options, giving me more flexibility in how the data is represented.
* Integrate with other platforms: iPhone Photo Gallery: I could integrate this with my Iphone as a feature to create an even more immersive and personalized experience. This app would allow me to combine my running data with visual memories automatically by year captured by my phone’s wallpaper

**Reflection:**

The purpose of this project was to explore the intersection between running, data, and community in my life. It challenged me to grow both as a runner and as a designer, using code to express insights that numbers alone can't capture. The visualization highlights the importance of community in sustaining endurance, as well as the lessons I have learned from running alone or with a group. By pushing my limits, tracking my progress, and reflecting on my experiences, I’ve gained a deeper understanding of myself, both as a runner and as a person.
