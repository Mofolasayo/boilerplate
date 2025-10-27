import { logger } from "@/lib/logging";

export type Metric = {
  name: string;
  value: number;
  tags?: Record<string, string>;
};

export const emitMetric = ({ name, value, tags }: Metric) => {
  logger.debug({ name, value, tags }, "metric");
};
