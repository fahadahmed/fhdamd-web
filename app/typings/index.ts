export type Tag = {
  id: string;
  attributes: {
    title: string;
    slug: string;
  };
};

export type CoverImage = {
  id: string;
  attributes: {
    url: string;
  };
};

export type Post = {
  id: string;
  attributes: {
    title: string;
    summary: string;
    slug: string;
    Order: number;
    coverImage: {
      data: CoverImage;
    };
    tags: {
      data: [Tag];
    };
  };
};
