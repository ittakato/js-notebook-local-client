interface BundleStartPayload {
  cellId: string;
}

interface BundleCompletePayload {
  cellId: string;
  bundle: {
    code: string;
    error: string;
  };
}

export type { BundleStartPayload, BundleCompletePayload };
