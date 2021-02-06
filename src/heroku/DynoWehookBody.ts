import { Record } from "@olian/typescript-helpers";

interface App {
  id: string;
  name: string;
}

interface Release {
  id: string;
  version: number;
}

interface Data {
  id: string;
  app: App;
  release: Release;
  command: string;
  size: string;
  exit_status?: any;
  management: string;
  state: string;
  type: string;
  name: string;
}

interface Actor {
  id: string;
  email: string;
}

interface PreviousData {}

interface Attempt {
  id: string;
}

interface Delivery {
  id: string;
}

interface Event {
  id: string;
  include: string;
}

interface Webhook {
  id: string;
}

interface WebhookMetadata {
  attempt: Attempt;
  delivery: Delivery;
  event: Event;
  webhook: Webhook;
}

interface RootObject {
  id: string;
  created_at: Date;
  data: Data;
  actor: Actor;
  previous_data: PreviousData;
  published_at?: any;
  resource: string;
  action: string;
  version: string;
  webhook_metadata: WebhookMetadata;
}

export class DynoWebhookBody extends Record<RootObject> {}
