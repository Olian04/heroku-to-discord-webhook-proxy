import { Record } from "@olian/typescript-helpers";

export const Color = {
  blue: parseInt("0x1B9AF0"),
  red: parseInt("0xD54F4F"),
  purple: parseInt("0x8359EE"),
  green: parseInt("0x6CBF5B"),
  orange: parseInt("0xF5A623"),
};

export class Embed extends Record<Embed> {
  public title!: string;
  public color!: number;
  public fields!: {
    name: string;
    value: string;
    inline: boolean;
  }[];
}
