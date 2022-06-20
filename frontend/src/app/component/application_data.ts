export class SidebarTab {
  name!: string;
  symbol!: string;
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


export class Instance{
  type!: string
  url!: string
  fxFlex!: string
  fxFlex_md!: string
  fxFlex_sm!: string
  fxFlex_xs!: string

}

export class Row{
  data!: Instance[]
  layoutGap!: string
}

export class Page{
  rows!: Row[]
}


export class BoxData{
  icon!: string
  name!: string
  value!: string
  additional_info: string | undefined
}

export class DateData{
  label!:string
  name!: string
  first_date!: string
  second_date!: string | null
}

export class TableData{
  columns!: TableColumn[]
  data!: Map<string, any>[]
}

export interface TableColumn{
   columnDef:string;
   header:string
}
