

const fpsSectionDescription = `FPS (frames per second) is a crucial metric in app development that serves as a critical indicator of the smoothness and performance of your app. It reflects the number of frames displayed on the screen per second and determines how well your app can keep up with user interactions. A higher FPS translates to smoother graphics and animations, whereas a low FPS can lead to problems such as lagging, frame skipping, and an overall poor user experience.

When your app is running at a low FPS, it can cause a myriad of issues, including stuttering, flickering, or jittering in the interface, resulting in a noticeable delay in response to the user's actions. This can significantly impact the user experience and make your app feel uncomfortable or even unusable. Furthermore, low FPS can sometimes result in app function failure, data loss, or security vulnerabilities, which can have severe consequences for both users and app developers.

To ensure that your app is performing optimally and delivering the best possible user experience, it's crucial to monitor FPS during app development. This can involve identifying and addressing performance bottlenecks, optimizing code and graphics, and testing your app on various devices and under different conditions to ensure that it performs well in all scenarios. Ultimately, the goal of monitoring FPS is to create an app that feels fast, responsive, and enjoyable to use, regardless of the user's device or operating system.

Therefore, it's essential to pay close attention to the FPS metric in your app's development process. By doing so, you can ensure that your app is running smoothly and providing the best possible experience to your users. See below for more detailed information on your app's FPS performance.
`

const powerUsageSectionDescription = `Power usage is a critical factor in mobile app development as it directly impacts the user experience, device performance, and even the health of the device. In particular, network requests and GPS location are two of the most power-hungry activities that can significantly affect the power consumption of your app.

The more network requests your app makes and the more data it requests, the more time it spends on requests, and the more power it consumes. Similarly, the more positioning your app uses and the longer it is used, the more power it consumes. As a result, it's essential to carefully monitor and manage your app's power consumption to ensure it doesn't negatively impact the user experience or device performance.

Excessive power consumption can have a range of negative effects on your app and device. Firstly, it can affect the user experience by draining the phone's battery quickly, leading to frustration and inconvenience for users. Secondly, it can reduce the performance of the phone by taking up valuable system resources, making it slower and less responsive overall. Finally, high power consumption may even cause damage to the phone by generating excessive heat and putting strain on internal components, potentially leading to permanent damage.

To avoid these issues, it's crucial to carefully manage power consumption during app development. This can involve optimizing code and network usage, minimizing the use of GPS positioning, and testing your app on a range of devices to ensure it performs well under different conditions. By carefully managing your app's power usage, you can ensure that it delivers the best possible user experience and performance, while also protecting the health of your users' devices.

See below for details on how your app performed in terms of power usage.
`

const locationRecommendations = [
  `Optimizing GPS requests on mobile devices can improve the accuracy, response time, and user experience of an application. Here are some suggestions for optimizing GPS requests on mobile devices:`,

  `1. Reduce the number of network requests: By combining multiple requests into one or using caching techniques, the number of requests can be reduced, which reduces network latency and data transfer time.`,

  `2. Enable location caching: Enabling location caching can reduce the number of location requests and response time, improving the performance and user experience of the application.`,

  `3. Adjust the priority of GPS requests: Adjusting the priority of GPS requests to a lower priority can reduce battery consumption and network traffic, improving the performance and user experience of the application.`,
]

const launchTimeSectionDescription = `The Launch Time section of the report measures the time elapsed from when the user clicks on the app icon to when the first screen is displayed. This is an important metric as it directly impacts the user experience of your app. A slow launch time can lead to frustration and impatience from users, which can ultimately lead to reduced usage and retention rates.

The impact of a slow launch time can be significant, including a negative effect on the user experience. Users expect apps to load quickly and smoothly, and a slow launch time can cause users to become bored or annoyed. Additionally, a slow launch time can impact the frequency of use of your app, as users may be less likely to open the app if they anticipate a long loading time. This, in turn, can affect the overall activity and retention rate of your app.

It is important to monitor and optimize the launch time of your app to ensure a positive user experience and improve user retention rates. By identifying and addressing bottlenecks in the app's startup process, developers can improve the launch time and ultimately create a more enjoyable and efficient user experience. See below for detailed measurements and analysis of your app's launch time.
`

const pageLoadTimeSectionDescription = `Page load time is the average amount of time it takes for a page to show up on your screen. It is calculated from initiation (when you tap a button or similar controls) to completion (when the page is fully loaded and appeared).
It varies depending on several factors such as the size of the page, the amount of content, the speed of the user's internet connection, and the processing power of the device being used to access the page.
`

const memoryLeakSectionDescription = `Memory leaks occur when an application fails to release unused objects from memory, causing memory resources to be tied up by objects that are no longer needed. As a result, the memory available to the application becomes increasingly limited, leading to issues such as app freezes, crashes, and slow performance.

The impact of memory leaks on an app can be significant. As memory usage grows, the app may start to consume more system resources, causing other apps to slow down or crash. In some cases, memory leaks can cause the entire system to become unstable, leading to a range of other issues such as data loss, security vulnerabilities, and more.

To prevent memory leaks, developers need to carefully manage the memory usage of their app, ensuring that all objects are properly released when they are no longer needed. This involves using tools and techniques such as garbage collection, memory profiling, and more to identify and address memory leaks as they occur.

By monitoring memory usage during app development, developers can ensure that their app is performing optimally and delivering the best possible user experience. This can involve identifying and addressing memory leaks, optimizing code and graphics, and testing the app on a variety of devices and under different conditions to ensure that it performs well in all scenarios. See below for the detailed report on memory leak in your app.
`

const memoryLeakRecommendation = `1. Use memory management tools: Using memory management tools such as Valgrind, LeakCanary, Instruments, etc. can help you quickly identify and fix memory leak issues.

2. Avoid circular references: Make sure there are no circular references in your code, which can prevent memory from being released.

3. Release resources in a timely manner: Release resources that are no longer needed, such as closing file handles, freeing dynamically allocated memory, etc.

4. Avoid unnecessary memory allocation: Avoid unnecessarily allocating memory in loops or recursive functions.

5. Use weak references: If you need to reference an object but don't want to keep it alive, you can use weak references, which can reduce the risk of memory leaks.

6. Use autorelease pools: In iOS development, you can use autorelease pools to release temporarily allocated objects, which can help reduce the risk of memory leaks.

7. Check for errors in your code: Check for errors in your code such as array out of bounds, pointer errors, etc., which can lead to memory leaks or other issues.
`

const fpsRecommendation = `1. Optimisation of code: unnecessary code should be minimised and if there is code that can be reused, it should be reused as much as possible.

2. Reducing page elements: reducing the number of elements in a page, such as images, text, animations, etc.

3. Rational use of layout: use a rational layout to reduce rendering time.

4. Optimise image resources: optimise the size and format of image resources to avoid excessively large images taking too long to load.

5. Avoid unnecessary re-layout and re-drawing: avoid unnecessary re-layout and re-drawing without affecting the display of the interface.
`

const launchTimeRecommendation = `1. Minimizing the loading of resources at startup, such as images, audio, video, etc.

2. Optimising the code logic at startup to minimise unnecessary judgements and loops.

3. Running some time-consuming tasks in the background, such as database queries, network requests, etc.

4. Using multi-process or multi-threaded approaches to achieve parallel processing.

5. Delaying the initialisation or loading of some less frequently used functions.
`

const pageLoadTimeRecommendation = `To ensure a fast page load time, you can optimize your code and content, use caching techniques, compress images to reduce their size.`

const fpsIndicatorDescription = `FPS indicators are typically classified as follows:

1. High FPS: This refers to a high number of frames per second, usually above 55 FPS. High FPS is desirable for smooth and responsive gameplay or graphics-intensive applications.

2. Medium FPS: This refers to a moderate number of frames per second, usually between 50-55 FPS. Medium FPS is still acceptable for most applications, but it may not feel as smooth or responsive as high FPS.

3. Low FPS: This refers to a low number of frames per second, usually below 50 FPS. Low FPS can result in choppy or sluggish performance, making it difficult or frustrating for users to interact with the application.
`
const locationGpsDescription = `GPS positioning is an important factor in the app's power consumption, and the more frequently it is used and the longer it is used the greater the impact on power consumption.`

const locationGpsTableHint = "the follow table lists the number of times positioning was used and the total length of time, in milliseconds"

const locationGpsRecommendations= [
  `Optimizing GPS requests on mobile devices can improve the accuracy, response time, and user experience of an application. Here are some suggestions for optimizing GPS requests on mobile devices:`,

  `1. Reduce the number of network requests: By combining multiple requests into one or using caching techniques, the number of requests can be reduced, which reduces network latency and data transfer time.`,

  `2. Enable location caching: Enabling location caching can reduce the number of location requests and response time, improving the performance and user experience of the application.`,

  `3. Adjust the priority of GPS requests: Adjusting the priority of GPS requests to a lower priority can reduce battery consumption and network traffic, improving the performance and user experience of the application.`,
]

const networkDescription = `Network traffic monitoring is to monitor network traffic through continuous collection of network data. By monitoring network traffic, we can find potential problems with too many or too large requests in the application.`

const networkRecommendations = [
  `Optimizing network requests on mobile devices is crucial for improving application performance and user experience. Here are some suggestions for optimizing network requests on mobile devices:`,

  `1. Reduce the number of network requests: By combining multiple requests into one or using caching techniques, the number of requests can be reduced, which reduces network latency and data transfer time.`,

  `2. Compress data: Compressing data can reduce data transfer size, thereby reducing response time and bandwidth usage.`,

  `3. Use lazy loading: Lazy loading is a technique that delays loading resources until they are needed in the visible area of the page, which can reduce page load time and bandwidth usage.`,

  `4. Cache data: Using caching on both the client and server can reduce network request times and response time, improving application performance.`,
]

const launchTimeStandardLink = "https://developer.apple.com/videos/play/wwdc2019/423/?time=302"
const networkStandardLink = [
  "https://www.runoob.com/http/http-status-codes.html",
  "https://developer.aliyun.com/article/35115"
]

const uiResDescription = `
Users can experience UI hangs for various reasons. If there's a longer than usual delay (200ms on average) or a failure to respond to a user's input, it's considered a UI hang.

UI hang can have a big impact on your App:

1. Poor user experience. UI hang can make users feel that the App is "stuck", which seriously affects the user experience.

2. The App score is affected. Frequent UI hang will make users feel that the App performance is poor and affect the App's rating in the store.

3. Reduce user engagement. Apps with poor user experience will also reduce user stickiness, reducing the number of times and time to open the App.

4. Influence brand image. Other apps from the same developer will also be affected, and users will feel that the overall quality of the developer's software is not high.

Therefore,UI hang is a problem that must be paid great attention to and avoided as much as possible in the process of App development`

const uiResRecommendation = `
1. Avoid time-consuming operations in the main thread, such as network requests and massive calculations, and use asynchronous threads for processing.

2. Use Handler to send messages and Looper to process messages properly to avoid message queue congestion in the main thread.

3. Reduce the workload of the main thread by placing some tasks on the worker thread.

4. Optimize the layout, reduce the redrawing area, optimize the image loading mode, etc., to reduce the pressure on the main thread.

5. Use the ProgressBar wisely to let users know what it feels like to be loading, not stuck.

6. Others, such as avoiding memory leaks, using efficient data structures, etc
`
const uiResDataDescription = [
  { "text": "The data is collected from the monitoring during the app operation. If the stalling time exceeds ", "isRich": false },
  {"text": "200ms", "isRich": true},
  {"text": ", it is recorded as an exception", "ieRich": false}
]
const uiResNoDataDescription = "No ANR exception was detected, and the app fluency was good"

const cpuDescription = "CPU usage refers to the proportion of time in a period when the CPU is active and running instructions in the total time. It is an important index to measure the utilization and consumption of CPU resources in an application or system."
const highCpuDescription = `
CPU usage has a big impact on apps:

1. App performance is affected. High CPU usage means that the App occupies a large amount of CPU resources. In this case, the running speed of the App slows down, resulting in performance problems such as interface stutters and uneven animation.

2. Reduce battery life. CPU operation requires power, and higher CPU usage means more power consumption, which drains your phone's battery faster and reduces battery life.

3. Fever. CPU running generates heat. High CPU usage generates more heat. Running for a long time may overheat the mobile phone, affecting hardware stability.

4. Risk of ANR or Crash. When the CPU usage is very high, the CPU resources occupied by the App will be less and less. At this time, the main thread is prone to ANR, which will also cause Crash due to resource shortage.

5. User experience is affected. Due to the above reasons, high CPU usage will make users feel that the App runs slowly, consumes power quickly, and the machine heats up, which seriously affects the user experience.
`
const cpuRankTableHint = "the number of left is the average usage rate, the number of middle is the max usage rate, the number of right is the duration"
const cpuRecommendation = `
1. Avoid time-consuming operations in the main thread, such as network requests and massive calculations, and use asynchronous threads for processing.

2. Use Handler to send messages and Looper to process messages properly to avoid message queue congestion in the main thread.

3. Reduce the workload of the main thread by placing some tasks on the worker thread.

4. Optimize the layout, reduce the redrawing area, optimize the image loading mode, etc., to reduce the pressure on the main thread.

5. Use the ProgressBar wisely to let users know what it feels like to be loading, not stuck.

6. Test and monitor ANR, find the cause of ANR and solve it.

7. Others, such as avoiding memory leaks, using efficient data structures, etc.
`

const Strings = {
  fps: {
    sectionDescription: fpsSectionDescription,
    recommendation: fpsRecommendation,
    indicatorDescription: fpsIndicatorDescription,
  },
  uiRes: {
    sectionDescription: uiResDescription,
    recommendation: uiResRecommendation,
    dataDescription: uiResDataDescription,
    noDataDescription: uiResNoDataDescription
  },
  powerUsage: {
    sectionDescription: powerUsageSectionDescription,
    locationRecommendations: locationRecommendations,
    networkRecommendations: networkRecommendations,
  },
  cpu: {
    description: cpuDescription,
    highUsageDescription: highCpuDescription,
    hint: cpuRankTableHint,
    recommendation: cpuRecommendation
  },
  launchTime: {
    sectionDescription: launchTimeSectionDescription,
    recommendation: launchTimeRecommendation,
    launchTimeStandardLink: launchTimeStandardLink,
  },
  pageLoadTime: {
    sectionDescription: pageLoadTimeSectionDescription,
    recommendation: pageLoadTimeRecommendation,
  },
  memoryLeak: {
    sectionDescription: memoryLeakSectionDescription,
    recommendation: memoryLeakRecommendation,
  },
  location: {
    sectionDescription: locationGpsDescription,
    recommendation: locationGpsRecommendations,
    hint: locationGpsTableHint
  },
  network: {
    sectionDescription: networkDescription,
    recommendation: networkRecommendations,
    standardLinks: networkStandardLink,
  }
}

export default Strings