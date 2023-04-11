

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

const Strings = {
  fps: {
    sectionDescription: fpsSectionDescription,
    recommendation: fpsRecommendation,
    indicatorDescription: fpsIndicatorDescription,
  },
  powerUsage: {
    sectionDescription: powerUsageSectionDescription,
    locationRecommendations: locationRecommendations,
    networkRecommendations: networkRecommendations,
  },
  launchTime: {
    sectionDescription: launchTimeSectionDescription,
    recommendation: launchTimeRecommendation,
    launchTimeStandardLink: launchTimeStandardLink,
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
  }
}

export default Strings