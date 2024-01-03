interface StateObj {
  data: DemoItem[];
}

interface DemoItem {
    value: Number;
    id: Number;
}

export type { StateObj, DemoItem };
