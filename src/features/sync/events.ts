// Fired on `window` after a cloud pull has merged data into local storage, so
// hooks that cache state (e.g. useSettings) can reload from the updated storage.
export const CLOUD_SYNCED_EVENT = 'tt-cloud-synced'
