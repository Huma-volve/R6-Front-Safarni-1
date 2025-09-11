// Navbar 

export type NavItem = {
  label: string;
  to: string;
};

export interface NavbarProps {
  links?: NavItem[];
  user?: { name?: string; avatarUrl?: string } | null;
  onSearch?: (query: string) => void;
}



// checkouts 



