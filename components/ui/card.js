export function Card({ children, ...props }) {
  return (
    <div {...props} className="bg-white rounded-2xl shadow-md">
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div {...props} className="p-4">
      {children}
    </div>
  );
}