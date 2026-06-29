import { HOBBY_PLANS, PRO_PLANS, PAAS_RATES, type Plan } from '../config';
import type { AppData } from '../data/types';

export interface PlanFit {
  fit: Plan; // smallest plan whose RAM and disk cover the stack
  comfortable: Plan | null; // one tier up, headroom for your own apps
}

function smallestFitting(plans: Plan[], ramMiB: number, diskGB: number): PlanFit {
  const i = plans.findIndex((p) => p.ramMiB >= ramMiB && p.diskGB >= diskGB);
  if (i === -1) {
    const last = plans[plans.length - 1]!;
    return { fit: last, comfortable: null };
  }
  return { fit: plans[i]!, comfortable: plans[i + 1] ?? null };
}

export function hobbyFit(app: AppData): PlanFit {
  return smallestFitting(HOBBY_PLANS, app.ramMiB, app.diskGB);
}

export function proFit(app: AppData): PlanFit {
  return smallestFitting(PRO_PLANS, app.ramMiB, app.diskGB);
}

export interface PaasEstimate {
  name: string;
  usd: number;
  note: string;
  url: string;
}

/** Estimated monthly cost of running the same stack on other PaaS. */
export function paasEstimates(app: AppData): PaasEstimate[] {
  const ramGiB = app.ramMiB / 1024;
  return PAAS_RATES.map((r) => ({
    name: r.name,
    usd: Math.round(
      r.base + Math.max(ramGiB * r.ramPerGiB, app.services * r.svcFloor) + app.diskGB * r.diskPerGB,
    ),
    note: r.note,
    url: r.url,
  }));
}

export function fmtRam(ramMiB: number): string {
  return ramMiB >= 1024 ? `${+(ramMiB / 1024).toFixed(1)} GiB` : `${ramMiB} MiB`;
}
