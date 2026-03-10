export type ViewType = 'monitoring' | 'incidents' | 'policies';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string; // Initials
}

export interface Incident {
  id: string;
  title: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  time: string;
  source?: string;
  target?: string;
  aiScore?: string;
  type?: string;
  status: 'detected' | 'investigating' | 'mitigating' | 'resolved';
  progress?: number;
  tags: Tag[];
  assignee?: {
    name: string;
    avatar?: string; // Initials
    color?: string;
  };
}

export interface Tag {
  label: string;
  type: 'danger' | 'warning' | 'info' | 'success';
}

export interface Alert {
  id: string;
  priority: 'P1' | 'P2' | 'P3';
  type: string;
  time: string;
  title: string;
  details: { label: string; value: string; monospace?: boolean }[];
  actions: { label: string; type: 'danger' | 'secondary'; icon?: boolean }[];
  level: 'critical' | 'high' | 'medium';
}

export interface FirewallRule {
  id: string;
  name: string;
  sourceIp: string;
  port: string;
  action: 'DENY' | 'LIMIT' | 'ALLOW';
  priority: 'High' | 'Medium' | 'Low';
  enabled: boolean;
}

export interface BlacklistEntry {
  ip: string;
  reason: string;
  addedBy: string;
  dateAdded: string;
  expires: string;
}

export interface WhitelistEntry {
  ip: string;
  description: string;
  addedBy: string;
  dateAdded: string;
}
