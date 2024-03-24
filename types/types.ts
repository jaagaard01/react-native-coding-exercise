export type Filter = {
  index: number;
  name: string;
  key: string;
};

export type Flight = {
  mission_name: string;
  id: string;
  launch_year: number | null;
  rocket: {
    rocket_type: string;
    rocket_name: string;
  };
};
