  // refer to the key of CONTENT_ITEMS
  export const DIRECTORIES_KEY_OVER_VIEW = "overView"
  export const DIRECTORIES_KEY_ANR = "anr"
  export const DIRECTORIES_KEY_POWER_USAGE = "powerUsage"
  export const DIRECTORIES_KEY_LAUNCH_TIME = "launchTime"
  export const DIRECTORIES_KEY_PAGE_LOAD_TIME = "pageLoadTime"
  export const DIRECTORIES_KEY_MEMORY_LEAK = "memoryLeak"
  export const DIRECTORIES_KEY_ABOUT = "about"

  export const directories = [
    DIRECTORIES_KEY_OVER_VIEW,
    DIRECTORIES_KEY_ANR,
    DIRECTORIES_KEY_POWER_USAGE,
    DIRECTORIES_KEY_LAUNCH_TIME,
    DIRECTORIES_KEY_PAGE_LOAD_TIME,
    DIRECTORIES_KEY_MEMORY_LEAK,
    DIRECTORIES_KEY_ABOUT
  ];
  
  export const DIRECTORIES_PLATFORMS = {
    ios: [...directories],
    android: [...directories],
    flutter: []
  };
