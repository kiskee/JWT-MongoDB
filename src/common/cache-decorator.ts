import * as cacheManager from 'cache-manager';
import { generateCacheKey } from './cache-commons';

// Create a singleton cache instance
export const cache = cacheManager.caching('memory', { max: 100, ttl: 10000 });

export function Cacheable(ttl: number = 30000) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ): TypedPropertyDescriptor<any> | void {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const className = target.constructor.name;
      const cacheKey = generateCacheKey(className, propertyKey, args); // `${className}_${propertyKey}_${JSON.stringify(args)}`;
      try {
        const cachedResult = await (await cache).get(cacheKey);
        if (cachedResult !== undefined) {
          return cachedResult;
        }
      } catch (error) {
        console.error(`Cache retrieval failed for key ${cacheKey}:`, error);
        // Log error and continue without throwing to allow original method call
      }

      // Call original method
      const result = await originalMethod.apply(this, args);

      try {
        await (await cache).set(cacheKey, result, ttl);
      } catch (error) {
        console.error(`Cache set failed for key ${cacheKey}:`, error);
        // Log error but do not interfere with returning the result
      }

      return result;
    };

    return descriptor; // Return the modified descriptor
  };
}
