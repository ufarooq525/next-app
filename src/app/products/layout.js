import Link from "next/link";

export default function layout({ children }) {
    return (
        <div>
            <Link href='/' className="inline-block text-orange-400 px-4 py-4 font-bold hover:underline">View All Products</Link>
            {children}
        </div>
    );
}