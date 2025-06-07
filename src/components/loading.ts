export class LoadingSpinner {
  static render(size: 'small' | 'medium' | 'large' = 'medium'): string {
    const sizeClasses = {
      small: 'w-4 h-4',
      medium: 'w-8 h-8',
      large: 'w-12 h-12'
    };

    return `
      <div class="flex items-center justify-center p-8">
        <div class="${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    `;
  }
}