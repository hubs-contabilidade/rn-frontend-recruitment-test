const statusMatchers: Record<number, { message: string; hint: string }> = {
  400: {
    message: "The Council of Ricks didn't understand your request.",
    hint: "Something's wrong with the request format.",
  },
  404: {
    message: "This character vanished into the multiverse.",
    hint: "Rick probably killed them, or they never existed in this dimension.",
  },
  429: {
    message: "You've been rate-limited by the Citadel. Too many requests!",
    hint: "Slow down, Morty! Wait a few seconds and try again.",
  },
  500: {
    message: "The portal fluid is leaking. Server went crazy.",
    hint: "Something broke on the API side. Try again later.",
  },
  503: {
    message: "The multiverse is under maintenance.",
    hint: "The API is temporarily unavailable. Try again later.",
  },
};

const fallback = {
  message: "Rick had too much to drink and took the API down with him.",
  hint: "Unknown error. Try again in a few seconds.",
} as const;

export function mapErrorMessage(
  message: string,
  statusCode?: number | null,
): { message: string; hint: string } {
  if (statusCode && statusCode in statusMatchers) {
    return statusMatchers[statusCode];
  }

  return fallback;
}
