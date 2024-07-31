export function getCssCustomProperty(propertyName: string): string {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(propertyName).trim();
  }
  