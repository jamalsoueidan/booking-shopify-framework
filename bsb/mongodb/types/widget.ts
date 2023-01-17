export interface WidgetStaffQuery {
  productId: number;
}

export interface WidgetDateQuery {
  staff: string;
  productId: number;
  start: string;
  end: string;
}

export interface WidgetStaff {
  tag: string;
  fullname: string;
  staff: string;
  avatar?: string;
  position?: string;
  anyAvailable?: boolean;
}

export interface WidgetHour {
  start: string;
  end: string;
  staff: {
    _id: string;
    fullname: string;
  };
}

export interface WidgetSchedule {
  date: string;
  hours: WidgetHour[];
}
