import { useEffect, useState } from "react";

const rawFlags = {
  billing: process.env.NEXT_PUBLIC_FEATURE_BILLING === "true",
  marketplace: process.env.NEXT_PUBLIC_FEATURE_MARKETPLACE === "true",
} as const;

export type FeatureFlag = keyof typeof rawFlags;

export const getFeatureFlag = (flag: FeatureFlag): boolean => rawFlags[flag];

export const useFeatureFlag = (flag: FeatureFlag) => {
  const [enabled, setEnabled] = useState(() => getFeatureFlag(flag));

  useEffect(() => {
    setEnabled(getFeatureFlag(flag));
  }, [flag]);

  return enabled;
};

export const getEnabledFlags = () => rawFlags;
