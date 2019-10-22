import lowerFirst from "lodash/lowerFirst";

// Typescript gets mad if we declare a global without exporting something.
// There is probably a better way around this but I ain't got time to waste
/**
 * @deprecated
 * @description Don't try to use this constant. It's literally not a thing
 */
export const shutUpTypescript = undefined;

declare global {
  namespace jest {
    // tslint:disable-next-line
    interface Matchers<R> {
      toHaveAStaticMethodNamed(methodName: string): R;
    }
  }
}

// The extend API is very confusing but thats all we have to work with, sorry!
// EXTENDING JESTS EXPECT - DOCS https://jest-bot.github.io/jest/docs/expect.html#expectextendmatchers
// Matchers should return an object with two keys. pass indicates whether there was a match or not,
// and message provides a function with no arguments that returns an error message in case of failure.
// Thus, when pass is false, message should return the error message for when
// expect(x).yourMatcher() fails. And when pass is true, message should return the error message
// for when expect(x).not.yourMatcher() fails.

expect.extend({
  toHaveAStaticMethodNamed(IconCmpt, methodName) {
    const staticMethod = IconCmpt[methodName];
    // Check to see if staticMethod is a component
    if (typeof staticMethod === "function") {
      return {
        pass: true,
        message: () =>
          `expected Icon.${methodName} NOT to exist but got: ${staticMethod}`
      };
    }

    return {
      pass: false,
      // prettier-ignore
      message: () =>
        `expected Icon.${methodName} to exist but it was undefined. You probably forgot to define it!
Try adding \` Icon.${methodName} = buildIcon(${lowerFirst(methodName)});\` to Icon/index.tsx`
    };
  }
});
