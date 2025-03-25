/**
 * Represents a single menu item in the hierarchy.
 */
export interface MenuItem {
  /** URL of the menu item, may contain dynamic segments (e.g., "/path/:id"). */
  url?: string
  /** Child menu items, if any. */
  child?: MenuItem[]
}

/**
 * Utility function to find the path to a menu item that matches a given URL.
 * @param menuArray - Array of menu items to search through.
 * @param targetUrl - The target URL to match against the menu.
 * @param currentPath - The current path of indices (used for recursive traversal).
 * @returns The path of indices to the matched menu item, or `null` if no match is found.
 */
export function findIndexPath(
  menuArray: MenuItem[],
  targetUrl: string,
  currentPath: number[] = []
): number[] | null {
  for (let i = 0; i < menuArray.length; i++) {
    const item = menuArray[i]
    const path = [...currentPath, i] // Update the current path with the current index

    // Check if the menu item's URL matches the target URL or is a parent of the target URL
    if (
      item?.url &&
      (matchDynamicPath(item.url, targetUrl) ||
        targetUrl.startsWith(item.url + "/") ||
        targetUrl === item.url)
    ) {
      return path // Return the path to the matched item
    }

    // If the item has children, recursively search within them
    if (item.child && item.child.length > 0) {
      const childPath = findIndexPath(item.child, targetUrl, path)
      if (childPath) {
        return childPath // Return the path to the matched child
      }
    }
  }

  // If no match is found, return null
  return null
}

/**
 * Matches a menu URL with dynamic segments (e.g., ":id") against a target URL.
 * @param menuUrl - The menu URL, which may contain dynamic segments (e.g., "/path/:id").
 * @param targetUrl - The actual URL to match (e.g., "/path/123").
 * @returns `true` if the URLs match; otherwise, `false`.
 */
function matchDynamicPath(menuUrl: string, targetUrl: string): boolean {
  if (!menuUrl) return false

  // Convert dynamic segments (":param") into a regex
  const dynamicRegex = new RegExp(
    "^" +
      menuUrl
        .replace(/:[^/]+/g, "([^/]+)") // Replace ":param" with a regex group
        .replace(/\//g, "\\/") + // Escape slashes
      "(/.*)?$" // Allow additional path segments after the main route
  )

  return dynamicRegex.test(targetUrl)
}
