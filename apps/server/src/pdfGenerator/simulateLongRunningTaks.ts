export const simulateLongRunningTask = async (progressCallback: (progress: number) => void): Promise<void> => {
    for (let i = 0; i <= 2; i++) {
      progressCallback(i);
      console.log('Loading...');
      // Simulate work
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  };
  