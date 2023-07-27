import { BaseFilter, Item } from "https://deno.land/x/ddc_vim@v3.9.1/types.ts";

type Params = { nth: number };

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    return Promise.resolve(args.items.map((item) => {
      item.abbr = item.abbr ?? item.word;
      const words = item.word.split(/\s+/);
      if (words.length > 0) {
        item.word = words[args.filterParams.nth];
      }
      return item;
    }));
  }

  override params(): Params {
    return { nth: 0 };
  }
}
