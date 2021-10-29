export interface DrupalNodes {
  nodes: DrupalNode[];
}

export interface DrupalNode {
  title:  string;
  url:    string;
  images: any[] | DrupalImages;
}

export interface DrupalImages {
  desktop: string;
  ipad:    string;
  mobile:  string;
}
