import { Record } from "@olian/typescript-helpers";

export class Embed extends Record<Embed> {
  public title!: string;
  public color!: number;
  public fields!: {
    name: string;
    value: string;
    inline: boolean;
  }[];
}
