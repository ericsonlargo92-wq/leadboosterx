import { Handshake, Magnet, RefreshCw, type LucideIcon } from "lucide-react";
import type { StageId } from "./offer";

/** One icon per stage, shared by the homepage system cards and the project stage tags. */
export const STAGE_ICONS: Record<StageId, LucideIcon> = { capture: Magnet, nurture: RefreshCw, close: Handshake };
