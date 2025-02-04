import { cache } from "./cache-decorator";


export async function invalidateCache(cacheKey: string): Promise<void> {
    try {
      await (await cache).del(cacheKey);
      console.log(`Cache invalidated for key: ${cacheKey}`);
    } catch (error) {
      console.error(`Failed to invalidate cache for key ${cacheKey}:`, error);
    }
  }


  export function generateCacheKey(
    className: string,
    methodName: string,
    args: any[],
  ): string {
    console.log("cree esta key: ", `${className}_${methodName}_${JSON.stringify(args)}` )
    return `${className}_${methodName}_${JSON.stringify(args)}`;
  }