import { Record } from "@olian/typescript-helpers";

export const Color = {
  blue: parseInt("0x1B9AF0"),
  red: parseInt("0xD54F4F"),
  purple: parseInt("0x8359EE"),
  green: parseInt("0x6CBF5B"),
  orange: parseInt("0xF5A623"),
  white: parseInt("0xFFFFFF"),
};

class BaseEmbed<T> extends Record<BaseEmbed<T>> {
  public title!: string;
  public color!: number;
  public timestamp!: string;
}

export class ContentEmbed extends BaseEmbed<ContentEmbed> {
  public content!: string;
}

export class FieldsEmbed extends BaseEmbed<FieldsEmbed> {
  public fields!: Array<{
    name: string;
    value: string;
    inline: boolean;
  }>;
}

export type Embed = ContentEmbed | FieldsEmbed;
