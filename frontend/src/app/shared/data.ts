
export class MEData {
  key!: string
  value!: any
}

export class SidebarTab {
  name!: string;
  icon!: string;
  url!: string;
}

export class Filter {
  label!: string;
  url!: string;
  name!: string;
  single!: boolean;
  grouped!: boolean;

}

export class SidebarData{
  tabs!: SidebarTab[]
  filters!: Filter[]
}
