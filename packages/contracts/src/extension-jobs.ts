import { z } from "zod";

export const ExtensionJobStatusSchema = z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED"]);
export type ExtensionJobStatus = z.infer<typeof ExtensionJobStatusSchema>;

export const ExtensionJobPayloadSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["SYNC_DATA", "EXECUTE_ACTION", "HEARTBEAT"]),
  targetUrl: z.string().url().optional(),
  payload: z.record(z.any()),
  status: ExtensionJobStatusSchema,
  createdAt: z.string().datetime(),
});
export type ExtensionJobPayload = z.infer<typeof ExtensionJobPayloadSchema>;
