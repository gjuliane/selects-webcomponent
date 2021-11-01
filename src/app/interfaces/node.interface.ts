export interface DrupalNodes {
  nodes: DrupalNode[];
}

export interface DrupalNode {
  title:  string;
  url:    string;
  images: null | DrupalImages;
}

export interface DrupalImages {
  desktop: string;
  ipad:    string;
  mobile:  string;
  alt: string;
}
