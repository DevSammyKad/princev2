export interface Category {
  id: string;
  name: string;
  slug: string;
  imageString: string;
  subcategories?: Category[];
}
