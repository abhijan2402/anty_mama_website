export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  tags?: string[];
};

export const PRODUCT_DATA: Record<"ANTY_MAMA" | "NURSE_CAM", Product[]> = {
  ANTY_MAMA: [
    {
      id: "am-1",
      name: "Non-Stick Frying Pan",
      price: 2499,
      category: "Pans",
      image:
        "https://plus.unsplash.com/premium_photo-1714702844124-be1377d19666?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "High-quality non-stick pan with even heat distribution, perfect for daily cooking.",
    },
    {
      id: "am-2",
      name: "Cast Iron Kadai",
      price: 3299,
      category: "Kadai",
      image:
        "https://plus.unsplash.com/premium_photo-1714648165397-ff0ca4ec9ef4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Reliable HD camera system designed for continuous patient monitoring.",
    },
    {
      id: "am-3",
      name: "Cookware Combo Set",
      price: 6999,
      category: "Sets",
      image:
        "https://plus.unsplash.com/premium_photo-1664007654112-a6a19547ae7b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Reliable HD camera system designed for continuous patient monitoring.",
    },
  ],

  NURSE_CAM: [
    {
      id: "nc-1",
      name: "Nurse Cam Pro",
      price: 12999,
      category: "Cameras",
      image:
        "https://images.unsplash.com/photo-1725869973689-425c74f79a48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Reliable HD camera system designed for continuous patient monitoring.",
    },
    {
      id: "nc-2",
      name: "ICU Monitoring System",
      price: 29999,
      category: "Monitoring",
      image:
        "https://images.unsplash.com/photo-1725870456828-139463fd90a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Reliable HD camera system designed for continuous patient monitoring.",
    },
  ],
};
