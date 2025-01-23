import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom parameter decorator to extract user information from the request object.
 * This decorator can be used in controller methods to retrieve the authenticated user or a specific property of the user.
 *
 * @param data Optional parameter to specify a specific property of the user object to extract.
 * @param ctx ExecutionContext providing access to the request and response objects.
 * @returns The authenticated user object, a specific property of the user, or null if the user is not found.
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // Switch to the HTTP context and get the request object
    const request = ctx.switchToHttp().getRequest();

    // If the user is not found in the request, return null
    if (!request.user) {
      return null;
    }

    // If a specific property is requested, return that property; otherwise, return the entire user object
    return data ? request.user[data] : request.user;
  },
);
